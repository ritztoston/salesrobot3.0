import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Link, withRouter} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import PlayForWork from '@material-ui/icons/PlayForWork';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Fade from '@material-ui/core/Fade';
import Hidden from "@material-ui/core/Hidden";
import connect from "react-redux/es/connect/connect";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {logoutUser} from "../../actions/authActions";
import DivWrapper from "../hoc/DivWrapper";
import {headerImage} from "../../images/dataimg";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import isEmpty from "../../validations/isEmpty";
import {mainListItems} from "./listItems";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBarTitle: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#FFFFFF',
        color: '#0090ff',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawer: {
        zIndex: theme.zIndex.drawer + 5,
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        userSelect: 'none',
    },
    mainDrawer: {
        background: '#18202c',
        '& *': { color: 'rgba(255, 255, 255, 0.7)' },
        borderRight: 0,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        // background: '#48afff',
        cursor: 'pointer'
    },
    toolbarImg: {
        maxWidth: 150,
        width: '100%',
        height: 'auto',
        userSelect: 'none',
    },
    typoNav: {
        padding: '5px 20px',
        fontSize: '12px',
        transition: '.4s all',
    },
    typoNavClose: {
        opacity: 0,
    },
    menuButton: {
        marginLeft: 12,
    },
    menuButtonHidden: {
        display: 'none',
    },
});

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleMenu = e => {
        this.setState({ anchorEl: e.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    onLogoutLink = (e) => {
        e.preventDefault();
        const message = "Successfully logged out.";
        this.setState({ anchorEl: null });

        this.props.logoutUser(message, this.props.users);
        this.props.history.push("/")
    };

    render() {
        const {classes, children, auth, name, back_path} = this.props;
        const {user} = this.props.auth;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const nav_content = (
            <div className={classes.root}>
                <CssBaseline/>
                <Hidden mdUp>
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open,
                        })}
                    >
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.open && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography
                                className={classes.appBarTitle}
                                variant="h6"
                                color="inherit"
                                noWrap>
                                {name}
                            </Typography>
                            <div>
                                <IconButton
                                    aria-owns='menu-appbar'
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={this.handleMenu}
                                >
                                    {/*<Avatar alt={`${user.firstname} ${user.lastname}`}*/}
                                    {/*src={`http://www.analyticsapi.salesrobot.com${user.avatar}`}*/}
                                    {/*className={classes.avatar}/>*/}
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem className={classes.menuItem}>
                                        <ListItem button onClick={this.onLogoutLink}>
                                            <ListItemIcon className={classes.icon}>
                                                <PlayForWork />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
                                        </ListItem>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="temporary"
                        className={classNames(classes.drawer, {
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        })}
                        classes={{
                            paper: classNames(classes.mainDrawer, {
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open,
                            }),
                        }}
                        open={this.state.open}
                        onClose={this.handleDrawerClose}
                    >
                        <div className={classes.toolbar}
                             onClick={this.state.open ? this.handleDrawerClose : this.handleDrawerOpen}>
                            <img className={classes.toolbarImg}
                                 src={`data:image/png;base64,${headerImage}`}
                                 alt="SalesRobot Logo"/>
                        </div>
                        <List>
                            <Typography className={classNames(classes.typoNav, {[classes.typoNavClose]: !this.state.open,})}
                                        color="inherit" noWrap>
                                Navigation
                            </Typography>
                            {mainListItems}
                        </List>
                    </Drawer>
                </Hidden>
                <Hidden smDown>
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: !this.state.open,
                        })}
                    >
                        <Toolbar disableGutters={this.state.open}>
                            {!isEmpty(back_path) ? (<Button
                                aria-owns='menu-appbar'
                                aria-haspopup="true"
                                color="inherit"
                                component={Link}
                                to={back_path}
                            >
                                <ArrowBackIos /> Back
                            </Button>) : null}
                            <Typography
                                className={classes.appBarTitle}
                                variant="h6"
                                color="inherit"
                                noWrap>
                                {name}
                            </Typography>
                            <div>
                                <IconButton
                                    aria-owns='menu-appbar'
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={this.handleMenu}
                                >
                                    {/*<Avatar alt={`${user.firstname} ${user.lastname}`}*/}
                                    {/*src={`http://www.analyticsapi.salesrobot.com${user.avatar}`}*/}
                                    {/*className={classes.avatar}/>*/}
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={this.onLogoutLink}>
                                        <ListItemIcon className={classes.icon}>
                                            <PlayForWork />
                                        </ListItemIcon>
                                        <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
                                    </MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={classNames(classes.drawer, {
                            [classes.drawerOpen]: !this.state.open,
                            [classes.drawerClose]: this.state.open,
                        })}
                        classes={{
                            paper: classNames(classes.mainDrawer, {
                                [classes.drawerOpen]: !this.state.open,
                                [classes.drawerClose]: this.state.open,
                            }),
                        }}
                        open={!this.state.open}
                    >
                        <div className={classes.toolbar}
                             onClick={this.state.open ? this.handleDrawerClose : this.handleDrawerOpen}>
                            <img className={classes.toolbarImg}
                                 src={`data:image/png;base64,${headerImage}`}
                                 alt="SalesRobot Logo"/>
                        </div>
                        <List>
                            <Typography className={classNames(classes.typoNav, {[classes.typoNavClose]: this.state.open,})}
                                        color="inherit" noWrap>
                                Navigation
                            </Typography>
                            {mainListItems}
                        </List>
                    </Drawer>
                </Hidden>
                {children}
            </div>
        );

        return (
            <DivWrapper>
                {auth.isAuthenticated ? nav_content : children}
            </DivWrapper>
        );
    }
}

Navigation.propTypes = {
    auth: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{logoutUser})(withStyles(styles, { withTheme: true })(withRouter(Navigation)));