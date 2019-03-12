import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from "../navigation/Navigation";
import isEmpty from "../../validations/isEmpty";

const PrivateRoute = ({component: Component, auth, ...rest}) => <Route {...rest} render = {props => {
    return (
        isEmpty(props.location.search) ? (auth.isAuthenticated ? (<Navigation name={rest.name} back_path={rest.back_path}><Component {...props}/></Navigation>) : (<Redirect to="/login" />)) : (auth.isAuthenticated ? (<Component {...props}/>) : (<Redirect to="/login" />))
    )
    // auth.isAuthenticated ? (<Navigation name={rest.name} back_path={rest.back_path}><Component {...props}/></Navigation>) : (<Redirect to="/login" />)
}
}/>;

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
