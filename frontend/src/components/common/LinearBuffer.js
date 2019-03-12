import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        flexGrow: 1,
    },
};

class LinearBuffer extends React.Component {
    state = {
        completed: 40,
        buffer: 50,
    };

    componentDidMount() {
        this.timer = setInterval(this.progress, 250);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        const { completed } = this.state;
        if (completed < 96) {
            const diff = Math.random() * 10;
            const diff2 = Math.random() * 10;
            this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
        } //else {
        //     const diff = Math.random() * 10;
        //     const diff2 = Math.random() * 10;
        //     this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
        // }
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