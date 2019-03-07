import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import {Base64} from 'js-base64';
import {getTemplate, getRss} from "../../actions/accountActions";
import connect from "react-redux/es/connect/connect";
import renderHTML from 'react-render-html';
import isEmpty from "../../validations/isEmpty";
import DivWrapper from "../hoc/DivWrapper";
import Loading from "../common/Loading";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import VerticalAlignBottom from '@material-ui/icons/VerticalAlignBottom';
import Error from '@material-ui/icons/Error';
import SwapVert from '@material-ui/icons/SwapVert';
import classNames from "classnames";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from "react-router-dom";
import firstLetterCapital from "../../utils/firstLetterCapital";

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        backgroundColor: '#F6F6F6',
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 3,
        outline: 'none',
    },
    buttons: {
        color: '#0090ff',
        padding: 10,
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    alertIcon: {
        color: '#F4766B',
        paddingTop: '15px',
        textAlign: 'center',
        fontSize: '65px !important',
        paddingBottom: 0,
    },
    dialogTitle: {
        paddingTop: 0,
        textAlign: 'center',
    },
});

class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            categories: []
        };

        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        this.componentDidMount();
    };

    componentDidMount() {
        const {account} = this.props.match.params;
        const {getTemplate, getRss} = this.props;
        const decoded_account = Base64.decode(account);
        this.setState({account: Base64.decode(account)});

        getTemplate(decoded_account);
        getRss(decoded_account);
    }

    createMarkup() {
        let template = this.props.accounts.template.map(template => template.template.replace(/\\/g, ''));
        const {rss} = this.props.accounts;
        const template1 = '<li style="padding-bottom:5px;"> <a href="[URL]"\n' +
            'data-type="text" style="text-decoration:none;color:#4599c5;line-height:1;font-size:12px">\n' +
            '[TITLE]\n' +
            '</a> </li>';
        const template2 = '<!-- STORY START -->\n' +
            '\n' +
            '      <!--[if mso | IE]>\n' +
            '      <table\n' +
            '         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"\n' +
            '      >\n' +
            '        <tr>\n' +
            '          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">\n' +
            '      <![endif]-->\n' +
            '\n' +
            '\n' +
            '      <div  style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">\n' +
            '\n' +
            '        <table\n' +
            '           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"\n' +
            '        >\n' +
            '          <tbody>\n' +
            '            <tr>\n' +
            '              <td\n' +
            '                 style="border-left:1px solid #CCCCCC;border-right:1px solid #CCCCCC;direction:ltr;font-size:0px;padding:0;text-align:center;vertical-align:top;"\n' +
            '              >\n' +
            '                <!--[if mso | IE]>\n' +
            '                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">\n' +
            '\n' +
            '        <tr>\n' +
            '\n' +
            '            <td\n' +
            '               class="" style="vertical-align:top;width:600px;"\n' +
            '            >\n' +
            '          <![endif]-->\n' +
            '\n' +
            '      <div\n' +
            '         class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"\n' +
            '      >\n' +
            '\n' +
            '      <table\n' +
            '         border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"\n' +
            '      >\n' +
            '        <tbody>\n' +
            '          <tr>\n' +
            '            <td  style="vertical-align:top;padding:25px 25px 0 25px;">\n' +
            '\n' +
            '      <table\n' +
            '         border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"\n' +
            '      >\n' +
            '        <table cellspacing="0" cellpadding="0" align="left" class="table">\n' +
            '                        <tbody>\n' +
            '                            <tr>\n' +
            '                                <td style="padding: 0 !important;">\n' +
            '                                    <table align="left" cellpadding="0" cellspacing="0" class="table">\n' +
            '                                        <tbody>\n' +
            '                                            <tr>\n' +
            '                                                <td width="5" rowspan="2" style="padding: 0 !important;">\n' +
            '                                                    <img style="display: block; margin: 0px; border: 0px; border-radius:7px;" alt="space" src="https://salesrobot.com/uploadimages/image/default/space.png">\n' +
            '                                                </td>\n' +
            '                                                 <!-- STORY IMAGE START-->\n' +
            '                                                <td class="left-img-content" style="padding: 0 5px 0 15px; margin: 0;" id="left-img-content-104702987269">\n' +
            '                                                    <img style="width: 150px; height: 150px; border-radius: 7px;" src="[IMAGE]" alt="Image" width="100" height="100">\n' +
            '                                                </td>\n' +
            '                                                 <!-- STORY IMAGE END -->\n' +
            '                                                <td width="1" rowspan="2" style="padding: 0 !important;">\n' +
            '                                                    <img style="display: block; margin: 0px; border: 0px;" alt="space" src="https://salesrobot.com/uploadimages/image/default/space.png">\n' +
            '                                                </td>\n' +
            '                                            </tr>\n' +
            '                                            <tr style="padding: 0 !important;">\n' +
            '                                                <td style="text-align: center; padding: 5px 5px 0 15px;">\n' +
            '                                                    <span class="left-text-caption" id="left-text-caption-104702987269"></span>\n' +
            '                                                </td>\n' +
            '                                            </tr>\n' +
            '                                        </tbody>\n' +
            '                                    </table>\n' +
            '                                    <div class="left-text-content" style="margin: 0 !important; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 14px; text-align: justify; color: #000000;" id="left-text-content-104702987269">\n' +
            '                                        <!--STORY TITLE START-->\n' +
            '                                            <span style="font-size: 10pt;">\n' +
            '                                                <a href="[URL]" style="text-decoration:none;font-size:14px;font-weight: bold; letter-spacing: 1px;">\n' +
            '                                                    <strong>[TITLE]</strong>\n' +
            '                                                </a>\n' +
            '                                            </span>\n' +
            '                                        <!--STORY TITLE END-->\n' +
            '                                        <!--STORY CONTENT START-->\n' +
            '                                        <p style="color:#666666;font-size:14px;line-height:18px">\n' +
            '                                            [CONTENT]<a href="[URL]"> Read More</a>\n' +
            '                                        </p>\n' +
            '                                        <!--STORY CONTENT END-->\n' +
            '                                    </div>\n' +
            '                                </td>\n' +
            '                            </tr>\n' +
            '                        </tbody>\n' +
            '                    </table>\n' +
            '      </table>\n' +
            '\n' +
            '            </td>\n' +
            '          </tr>\n' +
            '        </tbody>\n' +
            '      </table>\n' +
            '\n' +
            '      </div>\n' +
            '\n' +
            '          <!--[if mso | IE]>\n' +
            '            </td>\n' +
            '\n' +
            '        </tr>\n' +
            '\n' +
            '                  </table>\n' +
            '                <![endif]-->\n' +
            '              </td>\n' +
            '            </tr>\n' +
            '          </tbody>\n' +
            '        </table>\n' +
            '\n' +
            '      </div>\n' +
            '\n' +
            '\n' +
            '      <!--[if mso | IE]>\n' +
            '          </td>\n' +
            '        </tr>\n' +
            '      </table>\n' +
            '\n' +
            '      <table\n' +
            '         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"\n' +
            '      >\n' +
            '        <tr>\n' +
            '          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">\n' +
            '      <![endif]-->\n' +
            '\n' +
            '\n' +
            '      <div  style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">\n' +
            '\n' +
            '        <table\n' +
            '           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"\n' +
            '        >\n' +
            '          <tbody>\n' +
            '            <tr>\n' +
            '              <td\n' +
            '                 style="border-left:1px solid #CCCCCC;border-right:1px solid #CCCCCC;direction:ltr;font-size:0px;padding:0px;text-align:center;vertical-align:top;"\n' +
            '              >\n' +
            '                <!--[if mso | IE]>\n' +
            '                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">\n' +
            '\n' +
            '        <tr>\n' +
            '\n' +
            '            <td\n' +
            '               class="" style="vertical-align:top;width:600px;"\n' +
            '            >\n' +
            '          <![endif]-->\n' +
            '\n' +
            '      <div\n' +
            '         class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"\n' +
            '      >\n' +
            '\n' +
            '      <table\n' +
            '         border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-bottom: 1px solid gray"\n' +
            '      >\n' +
            '        <tbody>\n' +
            '          <tr>\n' +
            '            <td  style="vertical-align:top;padding:0px;">\n' +
            '\n' +
            '      <table\n' +
            '         border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"\n' +
            '      >\n' +
            '        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">\n' +
            '                        <tbody>\n' +
            '                            <tr style="line-height:15px;font-family:Helvetica, Arial, sans-serif;">\n' +
            '                                <td align="justify" style="padding-left:20px;padding-bottom:20px;text-align:center;">\n' +
            '\n' +
            '                                    <table align="left" cellpadding="0" cellspacing="0" margin="0" padding="0" style="width:auto;border:collapse;display:inline-block;font-family:Helvetica, Arial, sans-serif;">\n' +
            '                                        <tbody>\n' +
            '                                            <tr>\n' +
            '                                                <td style="padding:2px;">\n' +
            '                                                    <span style="font-weight: bold;font-size:14px;text-decoration: none; color: #000000;line-height:15px;display:inline-block;padding:2px 0;font-family:Helvetica, Arial, sans-serif;">\n' +
            '                                                        Tags:\n' +
            '                                                    </span>\n' +
            '                                                </td>\n' +
            '                                            </tr>\n' +
            '                                        </tbody>\n' +
            '                                    </table>\n' +
            '                                    [TAG]\n' +
            '                                </td>\n' +
            '                            </tr>\n' +
            '                        </tbody>\n' +
            '                    </table>\n' +
            '      </table>\n' +
            '\n' +
            '            </td>\n' +
            '          </tr>\n' +
            '        </tbody>\n' +
            '      </table>\n' +
            '\n' +
            '      </div>\n' +
            '\n' +
            '          <!--[if mso | IE]>\n' +
            '            </td>\n' +
            '\n' +
            '        </tr>\n' +
            '\n' +
            '                  </table>\n' +
            '                <![endif]-->\n' +
            '              </td>\n' +
            '            </tr>\n' +
            '          </tbody>\n' +
            '        </table>\n' +
            '\n' +
            '      </div>\n' +
            '\n' +
            '\n' +
            '      <!--[if mso | IE]>\n' +
            '          </td>\n' +
            '        </tr>\n' +
            '      </table>\n' +
            '      <![endif]-->\n' +
            '\n' +
            '    <!-- STORY END -->';

        let categories = [];
        rss.filter(data => {
            if(!isEmpty(categories) && !categories.some(e => e.category === data.category))
                categories.push({
                    category: data.category,
                    list_value: '',
                    details_value: '',
                });
            else if (isEmpty(categories))
                categories.push({
                    category: data.category,
                    list_value: '',
                    details_value: '',
                });
        });

        if(categories.length > 0) {
            categories.map(category => {
                rss.map(data => {
                    if(category.category === data.category) {
                        category.list_value += template1.replace("[TITLE]", data.title).replace("[URL]", data.url);
                        category.details_value += template2.replace("[TITLE]", data.title).replace(/\[URL]/g, data.url).replace("[CONTENT]", data.content).replace("[IMAGE]", data.image).replace("[TAG]", data.tag);
                    }
                })
            })
        }

        try {
            if(categories.length > 0) {
                template = template[0];
                categories.map(category => {
                    const list = "<li>["+category.category+"-]</li>";
                    const details = "["+category.category+"]";
                    template = template.replace(list, category.list_value);
                    template = template.replace(details, category.details_value);
                });

                if(this.state.categories.length === 0)
                    this.setState({categories})
            }
        } catch (e) {
            console.log();
        }

        return {__html: template};
    }

    render() {
        const {classes} = this.props;
        const {account, categories} = this.state;
        const {loading} = this.props.auth;

        const html_content = (
            <DivWrapper>
                <div className={classes.appBarSpacer} />
                {renderHTML('<style type="text/css">tr,td {border: 0 !important;} ul {padding-left: 40px;}</style>')}
                <div dangerouslySetInnerHTML={this.createMarkup()}/>
            </DivWrapper>
        );

        const no_rss = (
            <Dialog
                open={true}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='xs'
                fullWidth={true}
            >
                <Typography className={classes.alertIcon}>
                    <Error fontSize="inherit"/>
                </Typography>
                <DialogTitle className={classes.dialogTitle}>No RSS Found</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Possible reasons stated below:
                    </DialogContentText>
                    <List component="nav">
                        <ListItem>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="RSS feed is empty or not updated." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <VerticalAlignBottom />
                            </ListItemIcon>
                            <ListItemText primary="SalesRobot did not fetch in time. Please try again later." />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button component={Link} to="/accounts" color="primary">
                        Close
                    </Button>
                    <Button onClick={this.refresh} color="primary" autoFocus>
                        Retry
                    </Button>
                </DialogActions>
            </Dialog>
        );

        const content = categories.length > 0 ? html_content : no_rss;

        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Helmet>
                    <title>{firstLetterCapital(account)} | SalesRobot3.0</title>
                </Helmet>
                {loading ? (<Loading/>) : content}
            </main>
        )
    }
}

AccountDetails.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    getTemplate: PropTypes.func.isRequired,
    getRss: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    accounts: state.accounts
});

export default connect(mapStateToProps, {getTemplate, getRss})(withStyles(styles)(AccountDetails));