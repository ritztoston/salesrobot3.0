import React, {Component} from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import PropTypes from "prop-types";
import ContentLoader from "react-content-loader";
import Hidden from "@material-ui/core/Hidden";
import DivWrapper from "../hoc/DivWrapper";

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: '40px 8% 24px 8%',
        height: '100vh',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        cursor: 'pointer'
    },
});

const Loader = props => (
    <DivWrapper>
        {/*<Hidden mdDown>*/}
            <ContentLoader
                ariaLabel={"Loading..."}
                height={600}
                speed={2}
                primaryColor="#e0e0e0"
                secondaryColor="#f5f5f5"
                {...props}
            >
                <rect x="128" y="2.5" rx="1.5" ry="1.5" width="50" height="3" />
                <rect x="220" y="2.5" rx="1.5" ry="1.5" width="45" height="3" />
                <rect x="122" y="14.5" rx="0" ry="0" width="150" height="1450" />
            </ContentLoader>
        {/*</Hidden>*/}
    </DivWrapper>
);

class Loading extends Component {

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Loader/>
            </main>
        )
    }
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
