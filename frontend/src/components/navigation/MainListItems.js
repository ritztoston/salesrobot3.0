import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Email from '@material-ui/icons/Email';
import LayersIcon from '@material-ui/icons/Layers';
import {Link} from "react-router-dom";
import Wrapper from "../hoc/Wrapper";
import PropTypes from "prop-types";
import isEmpty from "../../validations/isEmpty";

const MainListItems = ({onClick}) => {

    return (
        <Wrapper>
            {/*<ListItem button component={Link} to="/dashboard">*/}
            {/*<ListItemIcon>*/}
            {/*<DashboardIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary="Dashboard"/>*/}
            {/*</ListItem>*/}
            <ListItem button component={Link} to="/accounts" onClick={onClick}>
                <ListItemIcon>
                    <LayersIcon/>
                </ListItemIcon>
                <ListItemText primary="Accounts"/>
            </ListItem>
            {/*<ListItem button component={Link} to="/campaigns" onClick={onClick}>*/}
                {/*<ListItemIcon>*/}
                    {/*<Email/>*/}
                {/*</ListItemIcon>*/}
                {/*<ListItemText primary="Campaigns"/>*/}
            {/*</ListItem>*/}
        </Wrapper>
    );
};

MainListItems.propTypes = {
    onClick: PropTypes.func,
};

export default MainListItems;