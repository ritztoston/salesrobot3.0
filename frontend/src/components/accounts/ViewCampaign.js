import React, {Component} from 'react';
import {
    TableCell,
    withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import {Base64} from 'js-base64';
import connect from "react-redux/es/connect/connect";
import classNames from "classnames";
import {Link} from "react-router-dom";
import * as SetBase64 from "../../utils/SetBase64";
import {getCampaignDetailView, getRssFeed} from "../../actions/accountActions";
import moment from 'moment';
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
});

class ViewCampaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaign_id: 0,
        };

        // this.linkClick = this.linkClick.bind(this);
    }

    // linkClick(shorten) {
    //     const new_shorten = Base64.encode(shorten);
    //     this.props.history.push(`/campaigns/${new_shorten}`)
    // };

    componentDidMount() {
        const {account, id} = this.props.match.params;
        const decoded_account = SetBase64.decode(account);
        const decoded_id = SetBase64.decode(id, true);

        this.props.getCampaignDetailView(decoded_account, decoded_id);
        this.setState({campaign_id: id})
    }


    render() {
        const {classes, auth} = this.props;
        const {campaign_id} = this.state;
        const {view} = this.props.accounts.campaigns;

        return (
            <main className={classNames(classes.content, {[classes.contentLoading]: auth.loading})}>
                <Helmet>
                    <title>Campaigns | SalesRobot3.0</title>
                </Helmet>
                <div className={classes.appBarSpacer} />
                <Typography variant="h4" component="span">
                    {!isEmpty(view.subject) && view.subject.replace('[TODAY:m/d/Y]', moment(view.embargo).tz("America/New_York").format("MM/DD/YYYY"))}{!isEmpty(view.subject) && view.subject.includes("[Admin]") ? (" - "+moment(view.embargo).tz("America/New_York").format("MM/DD/YYYY")) : null}
                </Typography>
                <Typography component="h3" style={{color: 'dimgray', textDecoration: 'none',}}>
                    Campaign ID: {campaign_id}
                </Typography>
            </main>
        )
    }
}

ViewCampaign.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    getRssFeed: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.loading,
    errors: state.errors,
    accounts: state.accounts,
});

export default connect(mapStateToProps, {getCampaignDetailView})(withStyles(styles)(ViewCampaign));
