import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from "../navigation/Navigation";
import isEmpty from "../../validations/isEmpty";
import queryString from "query-string";

const PrivateRoute = ({component: Component, auth, ...rest}) => <Route {...rest} render = {props => {
    const parsed = queryString.parse(props.location.search);
    const regEp = /\[[^)]+]/;
    if(regEp.exec(rest.back_path)) {
        const matches = rest.back_path.match(/\[(.*?)]/);

        if(matches[1] === 'account') {
            rest.back_path = rest.back_path.replace(matches[1], props.match.params.account).replace(/\[/,'').replace(/]/,'');
        }
    }

    return (
        !isEmpty(parsed) && parsed.view === 'clear' ?  (auth.isAuthenticated ? (<Component {...props}/>) : (<Redirect to="/login" />)) : (auth.isAuthenticated ? (<Navigation name={rest.name} back_path={rest.back_path}><Component {...props}/></Navigation>) : (<Redirect to="/login" />))
    )}
}/>;

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
