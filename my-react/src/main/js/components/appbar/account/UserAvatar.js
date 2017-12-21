import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import { connect } from "react-redux"

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
import Slide from 'material-ui/transitions/Slide';
import Grid from 'material-ui/Grid';

import { Manager, Target, Popper } from 'react-popper';
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@connect((store) => {
  return {
    user: store.login.user,
    roles: store.login.roles,
  }
})
class UserAvatar extends Component {
  state = {
    anchorEl: null,
    profileOpen: false,
    profileName: '',
    profileEmail: '',
    chatOpen: false,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  }
  handleRequestProfile = () => {
    console.log(this.props);
    this.setState({
      profileOpen: true, anchorEl: null,
      profileName: this.props.user.username,
      profileEmail: this.props.user.email,
    });
  }
  handleRequestProfileClose = () => {
    this.setState({ profileOpen: false });
  }
  handleRequestChat = () => {
    this.setState({ chatOpen: true, anchorEl: null, });
  }
  handleRequestChatClose = () => {
    this.setState({ chatOpen: false });
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

  onChangeProfileEmail = (e) => {
    this.setState({ profileEmail: e.target.value });
  }

  render() {
    const { anchorEl, profileOpen, profileEmail } = this.state;
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
              <ImageAvatars />
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
                      <Dialog open={profileOpen} ignoreBackdropClick >
                        <DialogTitle>Profile</DialogTitle>

                        <DialogContent>
                          <div className={classes.container}>
                            <Avatar alt="Remy Sharp" src="/images/ggobu2.png" className={classes.bigAvatar} />
                            <FormControl className={classes.formControl} >
                              <InputLabel htmlFor="name-disabled">Name</InputLabel>
                              <Input id="name-disabled" value={this.state.profileName} />
                              {/*<FormHelperText>Disabled</FormHelperText> */}
                            </FormControl>
                            <FormControl className={classes.formControl} >
                              <InputLabel htmlFor="name-disabled">Email</InputLabel>
                              <Input id="name-disabled" value={this.state.profileEmail} onChange={this.onChangeProfileEmail}/>
                              {/*<FormHelperText>Disabled</FormHelperText> */}
                            </FormControl>
                          </div>
                          <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send
                            updates occationally.
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleRequestProfileClose} className={classes.button} >
                            Cancel
                          </Button>
                          <Button onClick={this.handleRequestProfileClose} className={classes.button} >
                            Subscribe
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </MenuItem>
                    <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleRequestChat}>Chat
                      <div>
                        <Dialog
                          fullScreen
                          open={this.state.chatOpen}
                          onRequestClose={this.handleRequestChatClose}
                          transition={Transition}
                        >
                          <AppBar className={classes.appBar}>
                            <Toolbar>
                              <IconButton color="contrast" onClick={this.handleRequestChatClose} aria-label="Close">
                                <CloseIcon />
                              </IconButton>
                              <Typography type="title" color="inherit" className={classes.flex}>
                                Sound
                              </Typography>
                              <Button color="contrast" onClick={this.handleRequestClose}>
                                save
                              </Button>
                            </Toolbar>
                          </AppBar>

                          <Grid container spacing={24}>
                            <Grid item sm={3}>
                              <List>
                                <ListItem button>
                                  <ListItemIcon>
                                    <StarBorder />
                                  </ListItemIcon>
                                  <ListItemText primary="Phone ringtone" secondary="Titania" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                  <ListItemIcon>
                                    <ImageAvatars noMargin="true" />
                                  </ListItemIcon>
                                  <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                                </ListItem>
                              </List>
                            </Grid>

                            <Grid item sm>
                              <List>
                                <ListItem button>
                                  <ListItemIcon>
                                    <StarBorder />
                                  </ListItemIcon>
                                  <ListItemText primary="Phone ringtone" secondary="Titania" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                  <ListItemIcon>
                                    <ImageAvatars noMargin="true" />
                                  </ListItemIcon>
                                  <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                                </ListItem>
                              </List>
                            </Grid>
                          </Grid>
                        </Dialog>
                      </div>
                    </MenuItem>
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
