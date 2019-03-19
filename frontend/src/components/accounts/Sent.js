import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import isEmpty from "../../validations/isEmpty";
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment'
import BubbleText from "../common/BubbleText";

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
};

const Sent = ({data, classes, onClick, onChange, page, rowsPerPage}) => {
    const {count, results} = data;

    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell align="left">Campaign</TableCell>
                        <TableCell>Processed</TableCell>
                        <TableCell align="right">Sent</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!isEmpty(results) && results.map(result => (
                        <TableRow key={result.id} onClick={() => onClick(result.id)} style={{cursor: 'pointer'}} hover>
                            <TableCell component="th" scope="row">
                                {result.status === 'sent' ? <BubbleText text={'Sent'}/> : null}
                            </TableCell>
                            <TableCell align="left">{result.subject.replace('[TODAY:m/d/Y]', moment(result.sent).tz("America/New_York").format("MM/DD/YYYY"))}</TableCell>
                            <TableCell>{result.processed}</TableCell>
                            <TableCell align="right"><Moment format="ddd MMM DD, YYYY h:mm A" utc>{result.sent}</Moment></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[rowsPerPage]}
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            data="sample"
                            onChangePage={onChange}/>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

Sent.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default withStyles(styles)(Sent);