import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import isEmpty from "../../validations/isEmpty";
import 'moment-timezone';
import moment from 'moment';
import TimeAgo from "react-timeago/lib/index";
import BubbleText from "../common/BubbleText";
import {Visibility} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import ContentLoader from "react-content-loader";

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    action: {
        display: 'inline-block',
        backgroundColor: '#0090ff',
        padding: '4px 4px 0 4px',
        margin: '0 2px',
        borderRadius: '5px',
    },
};

const Loader = props => {
    return (
        <ContentLoader
            height={20}
            width={1060}
            speed={2}
            primaryColor="#d9d9d9"
            secondaryColor="#ecebeb"
            {...props}
        >
            <rect x="0" y="3" rx="6" ry="6" width={35} height="14" />
            <rect x="270" y="3" rx="6" ry="6" width={120} height="14" />
            <rect x="585" y="3" rx="6" ry="6" width={85} height="14" />
            <rect x="940" y="3" rx="6" ry="6" width={120} height="14" />
        </ContentLoader>
    )
};

const Active = ({data, classes, onClick, onChange, page, rowsPerPage, loading}) => {
    const {count, results} = data;
    const array = new Array(50).fill("");


    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell align="left">Campaign</TableCell>
                        <TableCell>Sending</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!isEmpty(results) && !loading ? results.map(result => (
                        <TableRow key={result.id} onClick={() => onClick(result.id)} style={{cursor: 'pointer'}} hover>
                            <TableCell component="th" scope="row">
                                {result.status === 'submitted' ? (<BubbleText text={"Sending"}/>) : (<BubbleText text={"Suspended"}/>)}
                            </TableCell>
                            <TableCell align="left">{result.subject.replace('[TODAY:m/d/Y]', moment(result.embargo).tz("America/New_York").format("MM/DD/YYYY"))}</TableCell>
                            <TableCell><TimeAgo date={result.embargo}/></TableCell>
                            <TableCell align="right">
                                TODO
                            </TableCell>
                        </TableRow>
                    )) :
                        array.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row" colSpan={4}>
                                    <Loader/>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[rowsPerPage]}
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={onChange}/>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

Active.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default withStyles(styles)(Active);