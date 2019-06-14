import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
// import DeleteIcon from '@material-ui/icons/Delete';
// import CloudUploadIcon from '@material-ui';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import { reduxRouter } from '../../common/utils';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        background: 'white',
        margin: '10px 0'
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // border: 0,
        // borderRadius: 3,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        // color: 'white',
        // height: 48,
        // padding: '0 30px'
    },
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white
            }
        }
    },
    icon: {
        margin: 16
    },
    iconHover: {
        margin: 16,
        '&:hover': {
            color: red[800]
        }
    },
    button: {
        margin: 8
    },
    leftIcon: {
        marginRight: 8
    },
    rightIcon: {
        marginLeft: 8
    },
    iconSmall: {
        fontSize: 20
    }
});

@withStyles(styles)
class MaterialUI extends Component {
    onClick = () => {
        console.log(1111);
        reduxRouter('home');
    };
    render() {
        const { classes } = this.props;
        // console.log(classes);
        return (
            <div>
                <div className={classes.root}>
                    <Icon className={classes.icon}>add_circle</Icon>
                    <Icon className={classes.icon} color="primary">
                        add_circle
                    </Icon>
                    <Icon className={classes.icon} color="secondary">
                        add_circle
                    </Icon>
                    <Icon className={classes.icon} color="action">
                        add_circle
                    </Icon>
                    <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }}>
                        add_circle
                    </Icon>
                    <Icon className={classes.icon} color="disabled" fontSize="large">
                        add_circle
                    </Icon>
                </div>
                <div className={classes.root}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Primary
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        Secondary
                    </Button>
                </div>
                <div className={classes.root}>
                    <Button variant="outlined" color="primary" className={classes.button}>
                        Primary
                    </Button>
                    <Button variant="outlined" color="secondary" className={classes.button}>
                        Secondary
                    </Button>
                </div>
                <div className={classes.root}>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        Delete
                        {/* <DeleteIcon className={classes.rightIcon} /> */}
                        <Icon className={classes.rightIcon}>delete</Icon>
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.onClick} className={classes.button}>
                        Send
                        <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                    <Button variant="contained" color="default" className={classes.button}>
                        Upload
                        <CloudUploadIcon className={classes.rightIcon} />
                    </Button>
                </div>
                <Paper>
                    <MenuList>
                        <MenuItem className={classes.menuItem}>
                            <ListItemIcon className={classes.icon}>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary="Sent mail" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                            <ListItemIcon className={classes.icon}>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary="Drafts" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                            <ListItemIcon className={classes.icon}>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary="Inbox" />
                        </MenuItem>
                    </MenuList>
                </Paper>
            </div>
        );
    }
}
export default MaterialUI;
