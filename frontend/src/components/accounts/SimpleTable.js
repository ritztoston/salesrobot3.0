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
function createData(account, schedule, team_lead, shorten) {
    id += 1;
    return { id, account, schedule, team_lead, shorten};
}

const data = [
    createData('AECOM', '6:00:00 AM','Gigi Melecio', 'aecom'),
    createData('Leidos', '6:00:00 AM','Jhoanna Valdez', 'leidos'),
    createData('SOS International', '6:00:00 AM','Gigi Melecio', 'sosi'),
    createData('Iridium', '6:00:00 AM','Gigi Melecio', 'iridium'),
    createData('Perspecta', '9:00:00 AM','Ray Santos', 'perspecta'),
    createData('American Systems', '9:00:00 AM','Marc Mondala', 'americansys'),
    // createData('ExecutiveBiz', '12:00:00 AM','Em Culion', 'executivebiz'),
];

function SimpleTable(props) {
    const {classes, onClick} = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell>Accounts</CustomTableCell>
                        <CustomTableCell>Schedule</CustomTableCell>
                        <CustomTableCell align="right">Team Lead</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(n => (
                        <TableRow key={n.id} onClick={() => onClick(n.shorten)} style={{cursor: 'pointer'}} hover>
                            <TableCell component="th" scope="row">
                                {n.account}
                            </TableCell>
                            <TableCell>{n.schedule}</TableCell>
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