import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        backgroundColor: '#F6F6F6',
        position: 'relative',
    },
});

class Construction extends Component {
    render() {
        const {classes} = this.props;

        return (
            <main className={classes.content} >
                <div className={classes.toolbar} />
                <Helmet>
                    <title>Under Construction | SalesRobot3.0</title>
                </Helmet>
            </main>
        )
    }
}

Construction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Construction);