import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    createData('ExecutiveBiz', 'Em Culion', 'executivebiz'),
    createData('GovCon Daily', '', 'govcondaily'),
];

function SimpleTable(props) {
    const {classes, onClick} = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Accounts</TableCell>
                        <TableCell align="right">Team Lead</TableCell>
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