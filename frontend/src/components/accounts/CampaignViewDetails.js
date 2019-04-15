import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import {getDeleteNewCampaignData, getMessageSubmitted, getPreviewCampaignData} from "../../actions/accountActions";
import connect from "react-redux/es/connect/connect";
import renderHTML from 'react-render-html';
import isEmpty from "../../validations/isEmpty";
import DivWrapper from "../hoc/DivWrapper";
import {withStyles, Typography, ListItem, List, ListItemIcon, ListItemText,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab} from '@material-ui/core';
import {
    Drafts as DraftsIcon,
    Refresh,
    VerticalAlignBottom,
    Error,
    Visibility,
    VisibilityOff,
    Cached,
    Send, AccessTime
} from '@material-ui/icons';
import {Link} from "react-router-dom";
import firstLetterCapital from "../../utils/firstLetterCapital";
import classNames from "classnames";
import currentDate from "../../utils/currentDate";
import Loading from "../common/Loading";
import queryString from "query-string";
import * as SetBase64 from "../../utils/SetBase64";
import LoadingMessage from "../common/LoadingMessage";
import {withSnackbar} from "notistack";

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
    fabBottom: {
        margin: 0,
        right: 40,
        left: 'auto',
        top: 'auto',
        bottom: 30,
        position: 'fixed',
    },
    fabComponent: {
        cursor: 'pointer',
        padding: 6,
        opacity: 0.2,
        transition: '.4s all',
        '&:hover' : {
            opacity: 1,
        }
    },
});

class CampaignViewDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            open: true,
            active: false,
        };

        this.refresh = this.refresh.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.visibility = this.visibility.bind(this);
        this.unpause = this.unpause.bind(this);
    };

    refresh() {
        this.componentDidMount();
    };

    unpause() {
        const {account, id} = this.props.match.params;
        const decoded_account = SetBase64.decode(account);
        const decoded_id = SetBase64.decode(id, true);
        const variant = 'success';

        this.props.getMessageSubmitted(decoded_account, decoded_id);
        this.props.history.push(`/campaigns/${account}?tab=active`);
        this.props.enqueueSnackbar(`Success! Sending campaign ${id}`, {variant});
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

    closeModal() {
        this.setState({open: false});
    };

    componentDidMount() {
        const {account, id} = this.props.match.params;
        const {getDeleteNewCampaignData, getPreviewCampaignData} = this.props;
        const decoded_account = SetBase64.decode(account);
        const decoded_id = SetBase64.decode(id, true);
        const {search} = this.props.location;
        const parsed = queryString.parse(search);
        let active = false;

        if(parsed.active)
            active = !active;

        if(parsed.active && parsed.sending) {
            getPreviewCampaignData(decoded_account, decoded_id);
        } else {
            getDeleteNewCampaignData(decoded_account, decoded_id);
        }


        this.setState({account: SetBase64.decode(account), active});
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
        const loadingM = this.props.loading;
        const {account, open, active} = this.state;
        const {loading} = this.props.auth;
        const {rss} = this.props.accounts;
        const parsed = queryString.parse(location.search);
        const encoded_account = SetBase64.encode(account);
        const html_content = (<DivWrapper>
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
            </List>
            {!active ? (<List component="nav" className={classes.fabBottom}>
                <ListItem className={classes.fabComponent}>
                    <Fab title="Send" aria-label="Send" onClick={this.unpause} style={{backgroundColor: '#06D6A0', color: '#FFFFFF',}}>
                        <Send />
                    </Fab>
                </ListItem>
            </List>) : null}

            {renderHTML('<style type="text/css">ul, ol {padding-left: 40px;}</style>')}
            <div dangerouslySetInnerHTML={this.createMarkup()}/>
        </DivWrapper>);
        const no_rss = (<Dialog
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
                </List>
                <DialogContentText id="alert-dialog-description">
                    Do you want to force start the campaign?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button component={Link} to={`/campaigns/${encoded_account}/?tab=active`} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.unpause} color="primary" autoFocus>
                    Force Start
                </Button>
            </DialogActions>
        </Dialog>);
        const no_rss_content = (<Dialog
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
                    <List component="nav" style={{padding: '20px 0 5px 0'}}>
                        <ListItem style={{padding: 0}}>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="RSS feed is empty or not updated." />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button component={Link} to={`/campaigns/${encoded_account}/?tab=active`} color="primary">
                        Back
                    </Button>
                    <Button onClick={this.refresh} color="primary" autoFocus>
                        Retry
                    </Button>
                </DialogActions>
            </Dialog>);

        const content = rss.length > 0 ? html_content : (active ? no_rss_content : no_rss);

        return (
            <main className={classNames(classes.content, {[classes.loading]: loading})} >
                <div className={classes.toolbar} />
                <Helmet>
                    <title>{firstLetterCapital(account)} | SalesRobot3.0</title>
                </Helmet>
                {loading ? (<LoadingMessage>{loadingM.message}</LoadingMessage>) : content}
            </main>
        )
    }
}

CampaignViewDetails.propTypes = {
    auth: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    getDeleteNewCampaignData: PropTypes.func.isRequired,
    getPreviewCampaignData: PropTypes.func.isRequired,
    getMessageSubmitted: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.loading,
    errors: state.errors,
    accounts: state.accounts
});

export default connect(mapStateToProps, {getPreviewCampaignData, getDeleteNewCampaignData, getMessageSubmitted})(withStyles(styles)(withSnackbar(CampaignViewDetails)));