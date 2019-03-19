import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core';
import blue from "@material-ui/core/es/colors/blue";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: blue[500],
        color: theme.palette.common.white,
    },
}))(TableCell);

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
};

let id = 0;
function createData(account, team_lead, shorten) {
    id += 1;
    return { id, account, team_lead, shorten};
}

const data = [
    createData('SOS International', 'Gigi Melecio', 'sosi'),
    createData('Leidos', 'Marc Mondala', 'leidos'),
    createData('American Systems', '', 'americansys'),
    createData('ExecutiveBiz', 'Em Culion', 'executivebiz'),
];

function SimpleTable(props) {
    const {classes, onClick} = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell>Accounts</CustomTableCell>
                        <CustomTableCell align="right">Team Lead</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(n => (
                        <TableRow key={n.id} onClick={() => onClick(n.shorten)} style={{cursor: 'pointer'}} hover>
                            <TableCell component="th" scope="row">
                                {n.account}
                            </TableCell>
                            <TableCell align="right">{n.team_lead}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(SimpleTable);