import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import {Link} from "react-router-dom";
import DivWrapper from "../hoc/DivWrapper";

export const mainListItems = (
    <DivWrapper>
        {/*<ListItem button component={Link} to="/dashboard">*/}
            {/*<ListItemIcon>*/}
                {/*<DashboardIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary="Dashboard"/>*/}
        {/*</ListItem>*/}
        <ListItem button component={Link} to="/accounts">
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="Accounts"/>
        </ListItem>
    </DivWrapper>
);