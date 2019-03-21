import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import {Base64} from 'js-base64';
import {getRSSData} from "../../actions/accountActions";
import connect from "react-redux/es/connect/connect";
import renderHTML from 'react-render-html';
import isEmpty from "../../validations/isEmpty";
import DivWrapper from "../hoc/DivWrapper";
import {withStyles, Typography, ListItem, List, ListItemIcon, ListItemText,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab} from '@material-ui/core';
import {Drafts as DraftsIcon, Refresh, VerticalAlignBottom, Error, Visibility, VisibilityOff, Cached} from '@material-ui/icons';
import {Link} from "react-router-dom";
import firstLetterCapital from "../../utils/firstLetterCapital";
import classNames from "classnames";
import currentDate from "../../utils/currentDate";
import Loading from "../common/Loading";
import queryString from "query-string";

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        backgroundColor: '#F6F6F6',
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 3,
        outline: 'none',
    },
    buttons: {
        color: '#0090ff',
        padding: 10,
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    alertIcon: {
        color: '#F4766B',
        paddingTop: '15px',
        textAlign: 'center',
        fontSize: '65px !important',
        paddingBottom: 0,
    },
    dialogTitle: {
        paddingTop: 0,
        textAlign: 'center',
    },
    loading: {
        height: '100vh',
        overflow: 'hidden'
    },
    fab: {
        margin: 0,
        bottom: 'auto',
        right: 40,
        left: 'auto',
        position: 'fixed',
    },
    fabComponent: {
        padding: 6,
        opacity: 0.2,
        transition: '.4s all',
        '&:hover' : {
            opacity: 1,
        }
    },
});

class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            open: true,
        };

        this.refresh = this.refresh.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.visibility = this.visibility.bind(this);
        this.refetch = this.refetch.bind(this);
    };

    refresh() {
        this.componentDidMount();
    };

    visibility() {
        const {pathname, search} = this.props.location;
        const {push} = this.props.history;
        const parsed = queryString.parse(search);


        if(!isEmpty(parsed.view) && parsed.view === 'clear')
            push(`${pathname}`);
        else
            push(`${pathname}?view=clear`);

    };

    refetch() {
        console.log('deleted contents')
    };

    closeModal() {
        this.setState({open: false});
    };

    componentDidMount() {
        const {account} = this.props.match.params;
        const {getRSSData} = this.props;
        const decoded_account = Base64.decode(account);
        this.setState({account: Base64.decode(account)});

        getRSSData(decoded_account);
    }

    createMarkup() {
        const {rss, index} = this.props.accounts;
        let template = this.props.accounts.template.map(template => template.template.replace(/\\/g, ''));
        let template1, template2, template3, indexes = '';
        let categories = [];

        this.props.accounts.feed_template.filter(feed_template => {if(feed_template.name === 'rss_template2') {template1 = feed_template.data.replace(/\\"/g, '"');} return null;});
        this.props.accounts.feed_template.filter(feed_template => {if(feed_template.name === 'rss_template') {template2 = feed_template.data.replace(/\\"/g, '"');} return null;});
        this.props.accounts.feed_template.filter(feed_template => {if(feed_template.name === 'rss_template3') {template3 = feed_template.data.replace(/\\"/g, '"');} return null;});

        rss.filter(data => {
            if(!isEmpty(categories) && !categories.some(e => e.category === data.category))
                categories.push({
                    category: data.category,
                    list_value: '',
                    details_value: '',
                });
            else if (isEmpty(categories))
                categories.push({
                    category: data.category,
                    list_value: '',
                    details_value: '',
                });

            return null;
        });

        if(!isEmpty(categories)) {
            categories.map(category => {
                rss.map(data => {
                    if(category.category === data.category) {
                        category.list_value += template1.replace("[TITLE]", data.title).replace("[URL]", data.url);
                        category.details_value += template2.replace("[TITLE]", data.title).replace(/\[URL]/g, data.url).replace("[CONTENT]", data.content).replace("[IMAGE]", data.image).replace("[TAG]", data.tag);
                    }
                    return null;
                });
                return null;
            });
        }

        if(!isEmpty(index)) {
            index.map(index => {
                if(!isEmpty(index.image)) {
                    indexes += template3.replace("[IMAGE]", index.image);
                }
                return null;
            })
        }

        try {
            if(!isEmpty(categories)) {
                template = template[0];

                categories.map(category => {
                    const list = "<li>["+category.category+"-]</li>";
                    const details = "["+category.category+"]";
                    template = template.replace(list, category.list_value);
                    template = template.replace(details, category.details_value);

                    return null;
                });

                if(!isEmpty(indexes))
                    template = template.replace("[INDEX]", indexes);
            }

            template = template.replace("[DATETODAY]", currentDate());

        } catch (e) {
            console.log();
        }

        return {__html: template};
    }

    render() {
        const {classes, location} = this.props;
        const {account, open} = this.state;
        const {loading} = this.props.auth;
        const {rss} = this.props.accounts;
        const parsed = queryString.parse(location.search);

        const html_content = (
            <DivWrapper>
                {!isEmpty(parsed.view) && parsed.view === 'clear' ? null : (<div className={classes.appBarSpacer} />)}
                <List component="nav" className={classes.fab}>
                    <ListItem className={classes.fabComponent}>
                        <Fab color="primary" title="Refresh" aria-label="Refresh" onClick={this.refresh}>
                            <Refresh />
                        </Fab>
                    </ListItem>
                    <ListItem className={classes.fabComponent}>
                        <Fab color="primary" title={!isEmpty(parsed.view) && parsed.view === 'clear' ? "Revert View" : "Clear View"} aria-label="Apps" onClick={this.visibility}>
                            {!isEmpty(parsed.view) && parsed.view === 'clear' ? (<VisibilityOff />) : (<Visibility />)}
                        </Fab>
                    </ListItem>

                    {/*{!isEmpty(parsed.view) && parsed.view === 'clear' ? null : (*/}
                        {/*<ListItem className={classes.fabComponent}>*/}
                            {/*<Fab color="primary" title="Re-Fetch Contents" aria-label="Apps" onClick={this.refetch}>*/}
                                {/*<Cached />*/}
                            {/*</Fab>*/}
                        {/*</ListItem>*/}
                    {/*)}*/}
                </List>

                {renderHTML('<style type="text/css">ul, ol {padding-left: 40px;}</style>')}
                <div dangerouslySetInnerHTML={this.createMarkup()}/>
            </DivWrapper>
        );

        const no_rss = (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='xs'
                fullWidth={true}
            >
                <Typography className={classes.alertIcon}>
                    <Error fontSize="inherit"/>
                </Typography>
                <DialogTitle className={classes.dialogTitle}>No RSS Found</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Possible reasons stated below:
                    </DialogContentText>
                    <List component="nav" style={{padding: '20px 0'}}>
                        <ListItem style={{padding: 0}}>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="RSS feed is empty or not updated." />
                        </ListItem>
                        <ListItem style={{padding: 0}}>
                            <ListItemIcon>
                                <VerticalAlignBottom />
                            </ListItemIcon>
                            <ListItemText primary="SalesRobot did not fetch in time. Please try again later." />
                        </ListItem>
                    </List>
                    <DialogContentText id="alert-dialog-description">
                        Note: You must wait at least (1) one minute after uploading the RSS feed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/*<Button onClick={this.closeModal} color="primary">*/}
                    {/*Close*/}
                    {/*</Button>*/}
                    <Button component={Link} to="/accounts" color="primary">
                        Back
                    </Button>
                    <Button onClick={this.refresh} color="primary" autoFocus>
                        Retry
                    </Button>
                </DialogActions>
            </Dialog>
        );

        const content = rss.length > 0 ? html_content : no_rss;

        return (
            <main className={classNames(classes.content, {[classes.loading]: loading})} >
                <div className={classes.toolbar} />
                <Helmet>
                    <title>{firstLetterCapital(account)} | SalesRobot3.0</title>
                </Helmet>
                {loading ? (<Loading/>) : content}
            </main>
        )
    }
}

AccountDetails.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    getRSSData: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    accounts: state.accounts
});

export default connect(mapStateToProps, {getRSSData})(withStyles(styles)(AccountDetails));