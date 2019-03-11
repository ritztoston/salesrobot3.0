import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import './App.css';
import Cookies from "universal-cookie/cjs";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';

//Components
import Login from './components/auth/Login';
import Dashboard from "./components/dashboard/Dashboard";
import Accounts from "./components/accounts/Accounts";
import AccountDetails from "./components/accounts/AccountDetails";
import PrivateRoute from "./components/common/PrivateRoute";
import DivWrapper from "./components/hoc/DivWrapper";


const cookie = new Cookies();
const cookie_token = cookie.get('sra_token');

if(cookie_token) {
    setAuthToken(cookie_token);
    const decoded = jwt_decode(cookie_token);
    store.dispatch(setCurrentUser(decoded));

    const message_content = "Session expired. Please login again.";
    const current_time = Date.now() / 1000;
    if (decoded.exp < current_time) {
        store.dispatch(logoutUser(message_content));
        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <DivWrapper>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/login" component={Login} />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} name={"Dashboard"}/>
                            <PrivateRoute exact path="/accounts" component={Accounts} name={"Accounts"}/>
                            <PrivateRoute exact path="/accounts/:account" component={AccountDetails} name={"Account Details"} back_path="/accounts"/>
                        </Switch>
                    </DivWrapper>
                </Router>
            </Provider>
        );
    }
}

export default App;
