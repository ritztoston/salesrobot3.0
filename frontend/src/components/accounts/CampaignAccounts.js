import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import SimpleTable from "./SimpleTable";
import {Base64} from 'js-base64';

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
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
        const new_shorten = Base64.encode(shorten);
        this.props.history.push(`/campaigns/${new_shorten}`)
    };


    render() {
        const {classes} = this.props;

        return (
            <main className={classes.content}>
                <Helmet>
                    <title>Campaigns | SalesRobot3.0</title>
                </Helmet>

                <div className={classes.appBarSpacer} />
                <Typography variant="h4" gutterBottom component="h2">
                    Campaigns
                </Typography>
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
