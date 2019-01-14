import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import axios from "axios"

// material-ui components
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// material-ui icons
import CloseIcon from '@material-ui/icons/Close';

//material-ui colors and style
import { withStyles } from '@material-ui/core/styles';

import Mail from './Mail'
import ChatModal from './ChatModal'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 1080,
    backgroundColor: theme.palette.background.paper,
  },
  listText: {
    color: 'white',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  wrapper: {
    maxWidth: 400,
    minWidth: 300,
  },
  fromColor: {
    color: 'rgb(128, 128, 128)',
  },
  messageColor: {
    color: 'white',
  },
});

@connect((store) => {
  return {
    user: store.login.user,
  }
})
class MailSnackbar extends Component {
  state = {
    open: false,
    messageInfo: {},
    chatModalOpen: false,
  };

  queue = [];

  handleClick = message => () => {
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
     // immediately begin dismissing current message
     // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };
  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
    this.props.handleNotificationClose(this.state.open)
  };
  handleExited = () => {
    this.processQueue();
  };
  handleSnackbar = () => {
    this.handleClose()
    axios.post(window.rootURI + "user/currentLoggedUsers")
      .then((response) => {
        this.setState({chatModalOpen: true})

      })
      .catch((err) => {
        console.log('error');
      })
  }
  chatModalClose = (chatModalOpen) => {
    this.setState({chatModalOpen, })
  }

  render() {
    const { classes } = this.props
    const { key } = this.state.messageInfo
    const { encodeAvatarImage, notification } = this.props.user
    const props = this.props

    const messageSnackbar = (
      <div className={classes.wrapper}>
        <Grid container wrap="nowrap" spacing={16}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={props.notification.fromAvatarImage} />
          </Grid>
          <Grid item xs zeroMinWidth onClick={this.handleSnackbar}>
            <Grid item>
              <Typography noWrap className={classes.fromColor}>
                <span>{props.notification.from}</span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography noWrap className={classes.messageColor}>
                <span>{props.notification.message}</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )

    return (
      <>
        <Snackbar
           key={key}
           anchorOrigin={{
             vertical: 'bottom',
             horizontal: 'right',
           }}
           open={this.props.notificationOpen}
           autoHideDuration={6000}
           onClose={this.handleClose}
           onExited={this.handleExited}
           ContentProps={{
             'aria-describedby': 'message-id',
           }}
           message={messageSnackbar}
           action={[
             <IconButton
               key="close"
               aria-label="Close"
               color="inherit"
               className={classes.close}
               onClick={this.handleClose}
             >
               <CloseIcon />
             </IconButton>,
           ]}
        />
        <ChatModal chatModalOpen={this.state.chatModalOpen}
                   chatModalClose={this.chatModalClose} />
      </>
    )
  }
}

export default withStyles(styles)(MailSnackbar)
