import React, {Component} from 'react';
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, TableCell, TableRow,
    withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Sent from "./Sent";
import connect from "react-redux/es/connect/connect";
import {getCampaignData, getMessageSent, messageNextPage} from "../../actions/accountActions";
import Active from "./Active";
import Draft from "./Draft";
import classNames from "classnames";
import * as SetBase64 from "../../utils/SetBase64";
import {withSnackbar} from "notistack";
import queryString from "query-string";
import ContentLoader from "react-content-loader";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: '40px 8% 24px 8%',
        backgroundColor: '#FFFFFF',
        overflow: 'auto',
    },
    contentLoading: {
        height: '100vh',
        overflow: 'hidden'
    },
    appbar: {
        backgroundColor: '#FFFFFF',
        color: '#0090ff',
    },
    tab_label: {
        color: '#FFFFFF',
        zIndex: 2,
        '&:disabled': {
            color: '#FFFFFF'
        }
    },
    dialogTitle: {
        paddingTop: 0,
        textAlign: 'center',
    },
});

const Loader = props => {
    return (
        <ContentLoader
            height={20}
            width={1060}
            speed={2}
            primaryColor="#d9d9d9"
            secondaryColor="#ecebeb"
            {...props}
        >
            <rect x="0" y="4" rx="6" ry="6" width={35} height="12" />
            <rect x="270" y="4" rx="6" ry="6" width={120} height="12" />
            <rect x="585" y="4" rx="6" ry="6" width={85} height="12" />
            <rect x="940" y="4" rx="6" ry="6" width={120} height="12" />
        </ContentLoader>
    )
};

class Campaigns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value_tab: 0,
            account: '',
            page: 0,
            rowsPerPage: 5,
            campaign_id: 0,
            campaign_title: '',
            open: false,
        };
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.changePage = this.changePage.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onPauseClose = this.onPauseClose.bind(this);
        this.onPauseContinue = this.onPauseContinue.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onPlayView = this.onPlayView.bind(this);
    }

    onPlayView = (id, isSending = false, active = false) => e => {
        e.stopPropagation();

        const {account} = this.props.match.params;
        let encoded_id = SetBase64.encode(id, true);

        if(!active)
            this.props.history.push(`/campaigns/${account}/${encoded_id}`);
        else if(active && !isSending)
            this.props.history.push(`/campaigns/${account}/${encoded_id}?active=true`);
        else if(isSending && active)
            this.props.history.push(`/campaigns/${account}/${encoded_id}?active=true&sending=true`);
    };

    onPause = (id, title) => e => {
        e.stopPropagation();

        this.setState({open: true, campaign_id: id, campaign_title: title});
    };

    onPauseClose() {
        this.setState({open: false});
    };

    onPauseContinue() {
        const {account} = this.props.match.params;
        const {campaign_id, campaign_title} = this.state;
        const decoded_account = SetBase64.decode(account);
        const variant = 'success';

        this.props.getMessageSent(decoded_account, campaign_id);
        this.componentDidMount();
        this.setState({open: false, value_tab: 2});
        this.props.history.push(`/campaigns/${account}?tab=draft`);
        this.props.enqueueSnackbar(`Success! Paused ${campaign_title}`, {variant});

    };

    handleChangeTab(e, value_tab) {
        const {account} = this.props.match.params;
        let tab = '';

        if(value_tab === 0)
            tab = 'sent';
        else if(value_tab === 1)
            tab = 'active';
        else if(value_tab === 2)
            tab = 'draft';

        this.setState({value_tab});
        this.props.history.push(`/campaigns/${account}?tab=${tab}`);
    };

    onClick(id) {
        const {account} = this.props.match.params;
        let encoded_id = SetBase64.encode(id, true);
        this.props.history.push(`/campaigns/${account}/${encoded_id}?action=view`)
    };

    changePage(e, page) {
        const {value_tab, account} = this.state;
        const {messageNextPage} = this.props;
        const type = value_tab === 0 ? 'sent' : value_tab === 1 ? 'active' : value_tab === 2 ? 'draft' : null;

        messageNextPage(account, type, page+1);
        this.setState({page});
    }

    componentDidMount() {
        const {account} = this.props.match.params;
        const {search} = this.props.location;
        const {getCampaignData} = this.props;
        const decoded_account = SetBase64.decode(account);
        const parsed = queryString.parse(search);
        let tab = 0;

        if(parsed.tab === 'sent')
            tab = 0;
        else if(parsed.tab === 'active')
            tab = 1;
        else if(parsed.tab === 'draft')
            tab = 2;

        this.setState({account: SetBase64.decode(account), value_tab: tab});
        getCampaignData(decoded_account);
    }

    render() {
        const {page, rowsPerPage, open, campaign_title} = this.state;
        const {classes, auth} = this.props;
        const {sent, active, draft} = this.props.accounts.campaigns;
        const pause_warning = (<Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Pause {campaign_title}?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Editing an active campaign will place it back in the Draft queue.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onPauseClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.onPauseContinue} color="primary" autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>);
        const array = new Array(50).fill("");
        const loading_content = (array.map((e, i) => (
            <TableRow key={i}>
                <TableCell component="th" scope="row" colSpan={4}>
                    <Loader/>
                </TableCell>
            </TableRow>
        )));

        return (
            <main className={classNames(classes.content, {[classes.contentLoading]: auth.loading})}>
                <Helmet>
                    <title>Campaigns | SalesRobot3.0</title>
                </Helmet>

                <div className={classes.appBarSpacer} />
                {pause_warning}
                <Typography variant="h3" gutterBottom component="h3">
                    List of Campaigns
                </Typography>
                <div style={{padding: '15px'}}/>
                <div className={classes.root}>
                    <Paper>
                        <AppBar position="static" color="primary" style={{boxShadow: 'none'}}>
                            <Tabs
                                value={this.state.value_tab}
                                onChange={this.handleChangeTab}
                                variant="scrollable"
                                scrollButtons="off"
                                indicatorColor="secondary"
                                textColor="primary"
                                TabIndicatorProps={{
                                    style: {
                                        height: '100%',
                                        zIndex: 1,
                                    }
                                }}
                            >
                                <Tab label="Sent" className={classes.tab_label}/>
                                <Tab label="Active" className={classes.tab_label} />
                                <Tab label="Draft" className={classes.tab_label}/>
                            </Tabs>
                        </AppBar>
                        {this.state.value_tab === 0 && <Sent data={sent} onChange={this.changePage} page={page} rowsPerPage={rowsPerPage} loading={auth.loading} loadingContent={loading_content}/>}
                        {this.state.value_tab === 1 && <Active data={active} onPlayView={this.onPlayView} onClick={this.onClick} onPause={this.onPause} onChange={this.changePage} page={page} rowsPerPage={rowsPerPage} loading={auth.loading} loadingContent={loading_content}/>}
                        {this.state.value_tab === 2 && <Draft data={draft} onPlayView={this.onPlayView} onChange={this.changePage} page={page} rowsPerPage={rowsPerPage} loading={auth.loading} loadingContent={loading_content}/>}
                    </Paper>
                </div>
            </main>
        )
    }
}

Campaigns.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    getCampaignData: PropTypes.func.isRequired,
    messageNextPage: PropTypes.func.isRequired,
    getMessageSent: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    accounts: state.accounts
});

export default connect(mapStateToProps, {getMessageSent, getCampaignData, messageNextPage})(withStyles(styles)(withSnackbar(Campaigns)));
