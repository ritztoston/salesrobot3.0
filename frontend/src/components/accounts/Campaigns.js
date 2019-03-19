import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import {Base64} from 'js-base64';
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Sent from "./Sent";
import connect from "react-redux/es/connect/connect";
import {getCampaignData, messageNextPage} from "../../actions/accountActions";
import Active from "./Active";
import Wrapper from "../hoc/Wrapper";
import Draft from "./Draft";
import LinearBuffer from "../common/LinearBuffer";
import isEmpty from "../../validations/isEmpty";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        backgroundColor: '#FFFFFF',
        overflow: 'auto',
    },
    appbar: {
        backgroundColor: '#FFFFFF',
        color: '#0090ff',
    },
    tab_label: {
        color: '#FFFFFF',
        zIndex: 2,
    }
});

class Campaigns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value_tab: 1,
            account: '',
            page: 0,
            rowsPerPage: 5,
        };
        this.linkClick = this.linkClick.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    linkClick(shorten) {
        const new_shorten = Base64.encode(shorten);
        this.props.history.push(`/Campaigns/${new_shorten}`)
    };

    handleChangeTab(e, value_tab) {
        this.setState({value_tab})
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
        const {getCampaignData} = this.props;
        const decoded_account = Base64.decode(account);
        this.setState({account: Base64.decode(account)});

        getCampaignData(decoded_account);
    }


    render() {
        const {page, rowsPerPage} = this.state;
        const {classes} = this.props;
        const {sent, active, draft} = this.props.accounts.campaigns;

        return (
            <main className={classes.content}>
                <Helmet>
                    <title>Campaigns | SalesRobot3.0</title>
                </Helmet>

                <div className={classes.appBarSpacer} />
                <Typography variant="h4" gutterBottom component="h2">
                    List of Campaigns
                </Typography>
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
                                <Tab label="Active" className={classes.tab_label}/>
                                <Tab label="Draft" className={classes.tab_label}/>
                            </Tabs>
                        </AppBar>
                        {this.state.value_tab === 0 && !isEmpty(sent) && <Sent data={sent} onChange={this.changePage} page={page} rowsPerPage={rowsPerPage}/>}
                        {this.state.value_tab === 1 && !isEmpty(active) && <Active data={active} onChange={this.changePage} page={page} rowsPerPage={rowsPerPage}/>}
                        {this.state.value_tab === 2 && !isEmpty(draft) && <Draft data={draft} onChange={this.changePage} page={page} rowsPerPage={rowsPerPage}/>}
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
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    accounts: state.accounts
});

export default connect(mapStateToProps, {getCampaignData, messageNextPage})(withStyles(styles)(Campaigns));
