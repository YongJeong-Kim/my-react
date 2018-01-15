import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import { connect } from "react-redux"
import { Manager, Target, Popper } from 'react-popper';

// material-ui components
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Menu, { MenuItem, MenuList } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Input, { InputLabel } from 'material-ui/Input';
import Avatar from 'material-ui/Avatar';

//material-ui colors and style
import { blue } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';
import CloseIcon from 'material-ui-icons/Close';
import StarBorder from 'material-ui-icons/StarBorder';

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
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleRequestClose = () => {
    this.setState({ anchorEl: null });
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
    const { anchorEl, profileOpen, profileEmail, receiveUserProps } = this.state;
    const dropMenuOpen = Boolean(anchorEl);
    const { classes } = this.props;

    return (
      <div>
        <Manager>
          <Target>
            <IconButton
              aria-owns={dropMenuOpen ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="contrast"
            >
              {receiveUserProps && <ImageAvatars />}
            </IconButton>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={dropMenuOpen}
            className={classNames({ [classes.popperClose]: !dropMenuOpen })}
          >
            <ClickAwayListener onClickAway={this.handleRequestClose}>
              <Grow in={dropMenuOpen} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem onClick={this.handleRequestProfile}>Profile
                      <ProfileModal handleRequestProfileClose={this.handleRequestProfileClose}
                                           profileOpen={profileOpen} />
                    </MenuItem>
                    <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleRequestChat}>Chat
                      {receiveUserProps &&
                        <ChatModal handleRequestChatClose={this.handleRequestChatClose}
                                          chatOpen={this.state.chatOpen} />
                      }
                    </MenuItem>
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
