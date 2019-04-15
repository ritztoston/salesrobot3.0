import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Button, Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, List, ListItem, ListItemIcon, ListItemText,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import isEmpty from "../../validations/isEmpty";
import 'moment-timezone';
import moment from 'moment';
import BubbleText from "../common/BubbleText";
import {Pause, Edit, Visibility, Error, Drafts as DraftsIcon, VerticalAlignBottom} from "@material-ui/icons";
import ContentLoader from "react-content-loader";
import Fab from "@material-ui/core/Fab";
import {Link} from "react-router-dom";
import TimeAgo from 'react-timeago';
import Wrapper from "../hoc/Wrapper";

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
    fab: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        color: '#0D2C54',
    },
};

const Active = ({data, classes, onClick, onChange, onPause, page, rowsPerPage, loading, loadingContent, onPlayView}) => {
    const {count, results} = data;

    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell align="left">Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!isEmpty(results) && !loading ? results.map(result => {
                            const campaignTime = moment(result.embargo).add(4, 'hours').format();
                            const currentDatetime = moment().format();
                            const isSending = moment(campaignTime).isBefore(currentDatetime);


                            return (
                                <TableRow key={result.id} onClick={onPlayView(result.id, isSending, true)} style={{cursor: 'pointer'}} hover>
                                    <TableCell component="th" scope="row">
                                        {result.status === 'submitted' ? (<BubbleText text={"Sending"}/>) : (<BubbleText text={"Suspended"}/>)}
                                    </TableCell>
                                    <TableCell align="left">{result.subject.replace('[TODAY:m/d/Y]', moment(result.embargo).tz("America/New_York").format("MM/DD/YYYY"))}{result.subject.includes("[Admin]") ? (" - "+moment(result.embargo).tz("America/New_York").format("MM/DD/YYYY")) : null}</TableCell>
                                    <TableCell>{isSending ? ('Sending...') : (<TimeAgo date={moment(result.embargo).add(4, 'hours').format('YYYY-MM-DD HH:mm:ss')}/>)}</TableCell>
                                    <TableCell align="right">
                                        <Fab size="small" aria-label="Pause" className={classes.fab} onClick={onPause(result.id, result.subject.replace('[TODAY:m/d/Y]', moment(result.embargo).tz("America/New_York").format("MM/DD/YYYY")))}>
                                            <Pause fontSize="small"/>
                                        </Fab>
                                        {/*<Fab size="small" aria-label="Edit" className={classes.fab}>*/}
                                        {/*<Edit fontSize="small"/>*/}
                                        {/*</Fab>*/}
                                        <Fab size="small" aria-label="Edit" className={classes.fab} onClick={onPlayView(result.id, isSending, true)}>
                                            <Visibility fontSize="small"/>
                                        </Fab>
                                    </TableCell>
                                </TableRow>
                            )}
                        ) :
                        (!loading && isEmpty(results) ? (<Wrapper>
                            <TableRow key={1}>
                                <TableCell colSpan={5} component="th" scope="row">
                                    <Typography component="div" style={{textAlign: 'center', padding: '10px 0', fontStyle: 'italic', color: '#696969',}}>
                                        - No active campaigns -
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </Wrapper>) : loadingContent)
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