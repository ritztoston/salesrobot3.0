import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from "../navigation/Navigation";

const PrivateRoute = ({component: Component, auth, ...rest}) => <Route {...rest} render = {props => auth.isAuthenticated ? (<Navigation><Component {...props}/></Navigation>) : (<Redirect to="/login" />)}/>;

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
