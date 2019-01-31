import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import axios from "axios"

// material-ui components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

// material-ui icons
import CloseIcon from '@material-ui/icons/Close';

//material-ui colors and style
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

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
    maxWidth: 1200,
    minWidth: 800,
  },
  fromColor: {
    color: 'rgb(128, 128, 128)',
  },
  messageColor: {
    color: 'white',
  },
  listItem: {
    '&:focus': {
      // backgroundColor: theme.palette.primary.main,
      backgroundColor: blue[500],
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
  barColor: {
    backgroundColor: blue[500],
  },
  closeButton: {
    color: 'white',
  },
  paper: {
    // width: '80%',
    maxHeight: 435,
    maxWidth: 250,
  },
  rootGrid: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    width: '100%',
  }
});

let currentLoggedUsers;

@connect((store) => {
  return {
    user: store.login.user,
    rootPath: store.login.rootPath,
  }
})
class ChatModal extends Component {
  state = {
    isCurrentLoggedUsersCallback: false,
  };

  componentWillMount = () => {
    // alert();
  }
  componentDidMount = () => {
  }
  handleClickOpen = () => {

  };

  handleClose = () => {
    this.setState({isCurrentLoggedUsersCallback: false,})
    this.props.chatModalClose(false);
  };
  findCurrentLoggedUsers = () => {
    if (this.state.isCurrentLoggedUsersCallback) {

    }
    else {
      axios.post(window.rootURI + 'user/currentLoggedUsers')
      .then((response) => {
        //    this.setState({isCurrentLoggedUsersCallback: true,})
        currentLoggedUsers = response.data
        this.setState({isCurrentLoggedUsersCallback: true, })
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  render() {
    const { fullScreen, classes } = this.props;
    const props = this.props;
    this.findCurrentLoggedUsers()

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.chatModalOpen}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
        disableBackdropClick
      >
        <Grid className={classes.rootGrid}>
          <Grid container wrap="nowrap" className={classes.barColor}>
            <Grid item>
              <IconButton className={classes.closeButton} color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container wrap="nowrap">
            <Grid item className={classes.paper}>
              <List>
                {this.state.isCurrentLoggedUsersCallback && currentLoggedUsers.map(currentLoggedUser => (
                  <ListItem button key={currentLoggedUser.username} className={classes.listItem}>
                    <div>
                      <Grid container wrap="nowrap" >
                        <Grid item>
                          <Avatar className={classes.icon} src={currentLoggedUser.avatarEncodeImage}></Avatar>
                        </Grid>
                        <Grid item xs zeroMinWidth style={{marginLeft: '10px', }}>
                          <Grid item>
                            <Typography className={classes.primary} noWrap>{currentLoggedUser.username}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.primary} noWrap>message</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs zeroMinWidth >
              <div>
                dddddzxc
              </div>
            </Grid>
          </Grid>
        </Grid>
  {/*         <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText> */}
            {props.notification &&
              <div className={classes.wrapper}>
                <Grid container wrap="nowrap" spacing={16}>
                  <Grid item>
          {/*          <Avatar alt="Remy Sharp" src={props.notification.fromAvatarImage} /> */}
                    ddd
                  </Grid>
                  <Grid item xs zeroMinWidth onClick={this.handleSnackbar}>
                    <Grid item>
        {/*              <Typography noWrap className={classes.fromColor}>
                        <span>{props.notification.from}</span>
                      </Typography> */}
                      zzz
                    </Grid>
                    <Grid item>
          {/*            <Typography noWrap className={classes.messageColor}>
                        <span>{props.notification.message}</span>
                      </Typography> */}
                      ggg
                    </Grid>
                  </Grid>
                </Grid>
              </div>}
    {/*      </DialogContentText>
        </DialogContent>  */}
        <DialogActions>
        </DialogActions>
      </Dialog>
    );
  }
}

ChatModal.propTypes = {
  // fullScreen: PropTypes.bool.isRequired,
};

// export default withMobileDialog()(ChatModal)
export default withStyles(styles)(ChatModal)
