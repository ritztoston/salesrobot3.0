import React, {Component, Fragment} from 'react';
import { Helmet } from 'react-helmet';

import classNames from 'classnames';
import {Paper, Grid} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/es/styles/withStyles";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {loginUser} from "../../actions/authActions";
import {headerImage} from "../../images/dataimg";
import LinearBuffer from "../common/LinearBuffer";
import Hidden from "@material-ui/core/Hidden";
import Wrapper from "../hoc/Wrapper";

const styles = () => ({
    cssFocused: {},
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: '#0090ff',
        },
    },
    notchedOutline: {},
    buttons: {
        color: 'white',
        backgroundColor: '#0090ff',
        padding: 10,
        '&:hover': {
            backgroundColor: '#48afff',
        },
    },
    buttons2: {
        color: '#0090ff',
        padding: 10,
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            is_show_password: false
        };
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static getDerivedStateFromProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            nextProps.history.push('/campaigns');
        }

        return null
    }

    handleClickShowPassword() {
        const {is_show_password} = this.state;
        this.setState({
            is_show_password: !is_show_password,
        });
    };

    onSubmit(e) {
        e.preventDefault();
        const {username, password} = this.state;
        const {loginUser, errors} = this.props;

        const user = {
            username,
            password
        };

        loginUser(user, errors);
    }



    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {is_show_password, username, password} = this.state;
        const {classes, errors, auth} = this.props;

        const form_content = (
            <Wrapper>
                <Grid item xs={10} className="grid__mui u-text-align-center">
                    <img src={`data:image/png;base64,${headerImage}`} className="header__logo u-margin-bottom-m" alt="SalesRobot Logo" />
                </Grid>
                <Grid item xs={10} className="grid__mui">
                    <TextField
                        fullWidth
                        label="Username"
                        helperText={errors.username ? errors.username : null}
                        type="text"
                        name="username"
                        autoComplete="username"
                        margin="normal"
                        variant="outlined"
                        value={username}
                        autoFocus
                        onChange={this.onChange}
                        InputProps={{
                            autoCapitalize: 'none',
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                        }}
                        error={errors.username}
                    />
                </Grid>
                <Grid item xs={10} className="grid__mui">
                    <TextField
                        style={{width: '100%'}}
                        id="outlined-adornment-password"
                        variant="outlined"
                        type={is_show_password ? 'text' : 'password'}
                        label="Password"
                        helperText={errors.password ? errors.password : null}
                        error={errors.password}
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {is_show_password ? <Visibility xs={2}/> : <VisibilityOff xs={12}/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6} className="u-margin-top-l">
                    <Button
                        className={classNames(classes.buttons2)}
                    >
                        Forgot Password?
                    </Button>
                </Grid>
                <Grid item xs={4} className="u-margin-top-l u-text-align-right">
                    <Button
                        variant="contained"
                        className={classNames(classes.buttons)}
                        disabled={auth.loading}
                        fullWidth
                        type="submit"
                    >
                        Login
                    </Button>
                </Grid>
            </Wrapper>
        );

        return (
            <Fragment>
                <Helmet>
                    <title>Login | SalesRobot3.0</title>
                </Helmet>

                <div className="login__container">
                    {auth.loading ? (<LinearBuffer/>) : null}
                    <form action="#" className="form" autoComplete="off" onSubmit={this.onSubmit} encType="application/json">
                        <Grid container className="login__container">
                            <Grid item xs className="login__container">
                                <Hidden mdUp>
                                    <Grid container justify="center" className="u-margin-top-lg u-margin-bottom-s">
                                        {form_content}
                                    </Grid>
                                </Hidden>
                                <Hidden smDown>
                                    <Paper className="paper__mui login__paper">
                                        <Grid container justify="center" spacing={24} className="u-margin-top-lg u-margin-bottom-s">
                                            {form_content}
                                        </Grid>
                                    </Paper>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Fragment>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(withStyles(styles)(Login));
