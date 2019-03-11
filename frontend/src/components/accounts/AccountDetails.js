import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import {Base64} from 'js-base64';
import {getTemplate, getFeedTemplate, getRss, getRSSData} from "../../actions/accountActions";
import connect from "react-redux/es/connect/connect";
import renderHTML from 'react-render-html';
import isEmpty from "../../validations/isEmpty";
import DivWrapper from "../hoc/DivWrapper";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import VerticalAlignBottom from '@material-ui/icons/VerticalAlignBottom';
import Error from '@material-ui/icons/Error';
import Button from '@material-ui/core/Button';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from "react-router-dom";
import firstLetterCapital from "../../utils/firstLetterCapital";
import classNames from "classnames";
import currentDate from "../../utils/currentDate";
import Loading from "../common/Loading";
import Fab from "@material-ui/core/Fab";

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
    fab: {
        margin: theme.spacing.unit,
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
    }

    refresh() {
        this.componentDidMount();
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
        const {index} = this.props.accounts;
        let template = this.props.accounts.template.map(template => template.template.replace(/\\/g, ''));
        let template1, template2, template3, indexes = '';

        this.props.accounts.feed_template.filter(feed_template => {if(feed_template.name === 'rss_template2') {template1 = feed_template.data.replace(/\\"/g, '"');} return null;});
        this.props.accounts.feed_template.filter(feed_template => {if(feed_template.name === 'rss_template') {template2 = feed_template.data.replace(/\\"/g, '"');} return null;});
        this.props.accounts.feed_template.filter(feed_template => {if(feed_template.name === 'rss_template3') {template3 = feed_template.data.replace(/\\"/g, '"');} return null;});

        const {rss} = this.props.accounts;

        let categories = [];

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

        if(categories.length > 0) {
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

        if(index.length > 0) {
            index.map(index => {
                if(!isEmpty(index.image)) {
                    indexes += template3.replace("[IMAGE]", index.image);
                }
            })
        }

        try {
            if(categories.length > 0) {
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
        const {classes} = this.props;
        const {account, open} = this.state;
        const {loading} = this.props.auth;
        const {rss} = this.props.accounts;

        const html_content = (
            <DivWrapper>
                <div className={classes.appBarSpacer} />
                {renderHTML('<style type="text/css">tr,td {border: 0 !important;} ul {padding-left: 40px;}</style>')}
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
                    <List component="nav">
                        <ListItem>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="RSS feed is empty or not updated." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <VerticalAlignBottom />
                            </ListItemIcon>
                            <ListItemText primary="SalesRobot did not fetch in time. Please try again later." />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    {/*<Button onClick={this.closeModal} color="primary">*/}
                        {/*Close*/}
                    {/*</Button>*/}
                    <Button component={Link} to="/accounts" color="primary">
                    Close
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
    getTemplate: PropTypes.func.isRequired,
    getFeedTemplate: PropTypes.func.isRequired,
    getRss: PropTypes.func.isRequired,
    getRSSData: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    accounts: state.accounts
});

export default connect(mapStateToProps, {getTemplate, getRss, getFeedTemplate, getRSSData})(withStyles(styles)(AccountDetails));