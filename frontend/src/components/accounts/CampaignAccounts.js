import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import SimpleTable from "./SimpleTable";
import {Base64} from 'js-base64';
import * as SetBase64 from "../../utils/SetBase64";

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: '40px 8% 24px 8%',
        height: '100vh',
        overflow: 'auto',
    },
});

class CampaignAccounts extends Component {
    constructor(props) {
        super(props);
        this.linkClick = this.linkClick.bind(this);
    }

    linkClick(shorten) {
        let new_shorten = SetBase64.encode(shorten);
        this.props.history.push(`/campaigns/${new_shorten}?tab=active`);
    };


    render() {
        const {classes} = this.props;

        return (
            <main className={classes.content}>
                <Helmet>
                    <title>Campaigns | SalesRobot3.0</title>
                </Helmet>

                <div className={classes.appBarSpacer} />
                <Typography variant="h3" gutterBottom component="h3">
                    Campaigns
                </Typography>
                <div style={{padding: '15px'}}/>
                <div>
                    <SimpleTable onClick={this.linkClick}/>
                </div>
            </main>
        )
    }
}

CampaignAccounts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignAccounts);
