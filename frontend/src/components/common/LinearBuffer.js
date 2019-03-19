import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        flexGrow: 1,
        zIndex: 99999,
    },
};

class LinearBuffer extends React.Component {
    state = {
        completed: 30,
        buffer: 100,
    };

    componentDidMount() {
        this.timer = setInterval(this.progress, 250);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        const { completed } = this.state;
        if (completed < 90) {
            const diff = Math.random() * 10;
            this.setState({ completed: completed + diff});
        }
    };

    render() {
        const { classes } = this.props;
        const { completed, buffer } = this.state;
        return (
            <div className={classes.root}>
                <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
            </div>
        );
    }
}

LinearBuffer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearBuffer);