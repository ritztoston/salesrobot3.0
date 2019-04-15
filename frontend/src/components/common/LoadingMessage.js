import React, {Component} from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import PropTypes from "prop-types";
import Loader from 'react-loader-spinner'
import {Typography} from "@material-ui/core";

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: '40px 8% 24px 8%',
        height: '100vh',
    },
    progress: {
        margin: theme.spacing.unit * 2,
        color: '#0090ff',
    },
});

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
        }
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.timeout = setInterval(() => {
            const currentIdx = this.state.textIdx;
            this.setState({ textIdx: currentIdx + 1 });
        }, 2100);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        clearInterval(this.timeout);
    }

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.content}>
                <div className="u-container-center u-text-align-center u-bg-transparent">
                    <Loader type="Rings" color="#0090ff" height={60} width={60} />
                    <Typography component={'div'} style={{fontStyle: 'italic'}}>{this.props.children}</Typography>
                </div>
            </main>
        )
    }
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
