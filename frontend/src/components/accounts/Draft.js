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
import {Edit, Pause, PlayArrow, Replay, Visibility} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Wrapper from "../hoc/Wrapper";
import Fab from "@material-ui/core/Fab";

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

const Draft = ({data, classes, onClick, onChange, page, rowsPerPage, onPlayView, loading, loadingContent}) => {
    const {count, results} = data;

    const content = (
        <Wrapper>
            <TableHead>
                <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/*<TableRow key={result.id} onClick={() => onClick(result.id)} style={{cursor: 'pointer'}} hover>*/}
                {!isEmpty(results) && !loading ? results.map(result => (
                    <TableRow key={result.id} onClick={onPlayView(result.id)} style={{cursor: 'pointer'}} hover>
                        <TableCell component="th" scope="row">
                            {result.status === 'draft' && (<BubbleText text={"Draft"}/>)}
                        </TableCell>
                        <TableCell align="left">{result.subject.replace('[TODAY:m/d/Y]', moment(result.embargo).tz("America/New_York").format("MM/DD/YYYY"))}</TableCell>
                        <TableCell align="right">
                            <Fab size="small" aria-label="Pause" className={classes.fab} onClick={onPlayView(result.id)}>
                                <PlayArrow fontSize="small"/>
                            </Fab>
                            {/*<Fab size="small" aria-label="Edit" className={classes.fab}>*/}
                                {/*<Edit fontSize="small"/>*/}
                            {/*</Fab>*/}
                        </TableCell>
                    </TableRow>
                )) :
                    (!loading && isEmpty(results) ? (<Wrapper>
                        <TableRow key={1}>
                            <TableCell colSpan={5} component="th" scope="row">
                                <Typography component="div" style={{textAlign: 'center', padding: '10px 0', fontStyle: 'italic', color: '#696969',}}>
                                    - No drafts -
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
        </Wrapper>
    );

    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                {content}
            </Table>
        </div>
    );
};

Draft.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default withStyles(styles)(Draft);