import React, {Component} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/es/styles/withStyles";
import PropTypes from "prop-types";

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
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
            textArray: ['Loading', 'Fetching data', 'Talking to the server', 'Server replied', 'Still loading'],
            textIdx: 0
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
        const textThatChanges = this.state.textArray[this.state.textIdx % this.state.textArray.length];

        return (
            <main className={classes.content}>
                <div className="u-container-center u-text-align-center u-bg-transparent">
                    <CircularProgress
                        className={classes.progress}
                        variant="indeterminate"
                        value={this.state.completed}
                        size={30}
                    />
                    <div>{textThatChanges}</div>
                </div>
            </main>
        )
    }
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
