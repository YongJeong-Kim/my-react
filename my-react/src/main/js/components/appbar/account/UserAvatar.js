import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import { connect } from "react-redux"
import { Manager, Target, Popper } from 'react-popper';

// material-ui components
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';

//material-ui colors and style
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import StarBorder from '@material-ui/icons/StarBorder';

import ImageAvatars from './ImageAvatars'
import { NoMarginImageAvatars } from './ImageAvatars'
import ChatModal from './modals/ChatModal'
import ProfileModal from './modals/ProfileModal'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  popperClose: {
    pointerEvents: 'none',
  },
  container: {
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    marginBottom: 10,
    display: 'flex',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  button: {
    color: blue[500],
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});



@connect((store) => {
  return {
    user: store.login.user,
  }
})
class UserAvatar extends Component {
  state = {
    open: false,
    receiveUserProps: false,
    anchorEl: null,
    profileOpen: false,
    chatOpen: false,
  };

  componentWillReceiveProps() {
    this.setState({
      receiveUserProps: true,
    });
  }
  handleMenu = () => {
    this.setState({ open: !this.state.open })
  }
  handleRequestClose = () => {
    if (this.target1.contains(event.target)) {
      return;
    }
    this.setState({ anchorEl: null, open: false, })
  }
  handleRequestProfile = () => {
    this.setState({
      profileOpen: true, anchorEl: null,
    });
  }
  handleRequestProfileClose = (profileOpen) => {
    this.setState({ profileOpen, });
  }
  handleRequestChat = () => {
    this.setState({ chatOpen: true, anchorEl: null, });
  }
  handleRequestChatClose = (chatOpen) => {
    this.setState({ chatOpen, });
  }
  handleLogout = () => {
    this.setState({ anchorEl: null });
    axios.post("/logout")
      .then((response) => {
        console.log('logout');
        window.location = "/";
      })
      .catch((err) => {
        console.log('logout err');
      })
  }

  render() {
    const { anchorEl, profileOpen, profileEmail, receiveUserProps, open } = this.state;
    const dropMenuOpen = Boolean(anchorEl);
    const { classes } = this.props;

    return (
      <div>
        <Manager>
          <Target>
            <div
              ref={node => {
                this.target1 = node;
              }}
            >
            <IconButton
              aria-owns={open ? 'menu-list-grow' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              {receiveUserProps && <ImageAvatars />}
            </IconButton>
            </div>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            <ClickAwayListener onClickAway={this.handleRequestClose}>
              <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem onClick={this.handleRequestProfile}>Profile</MenuItem>
                    <ProfileModal handleRequestProfileClose={this.handleRequestProfileClose}
                                         profileOpen={profileOpen} />
                    <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleRequestChat}>Chat</MenuItem>
                    {receiveUserProps &&
                      <ChatModal handleRequestChatClose={this.handleRequestChatClose}
                                        chatOpen={this.state.chatOpen} />
                    }
                    <Divider />
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    )
  }
}

UserAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserAvatar);
