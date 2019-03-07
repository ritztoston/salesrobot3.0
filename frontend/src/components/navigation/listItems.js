import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import {Link} from "react-router-dom";

export const mainListItems = (
    <div>
        <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        {/*<ListItem button>*/}
        {/*<ListItemIcon>*/}
        {/*<ShoppingCartIcon />*/}
        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Orders" />*/}
        {/*</ListItem>*/}
        {/*<ListItem button>*/}
        {/*<ListItemIcon>*/}
        {/*<PeopleIcon />*/}
        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Customers" />*/}
        {/*</ListItem>*/}
        {/*<ListItem button>*/}
        {/*<ListItemIcon>*/}
        {/*<BarChartIcon />*/}
        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Reports" />*/}
        {/*</ListItem>*/}
        <ListItem button>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
        </ListItem>
    </div>
);