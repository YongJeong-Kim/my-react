import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"

// material-ui components
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import Chip from 'material-ui/Chip';

//material-ui colors and style
import { blue } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';
import CloseIcon from 'material-ui-icons/Close';
import StarBorder from 'material-ui-icons/StarBorder';

import ImageAvatars from '../ImageAvatars'
import { NoMarginImageAvatars } from '../ImageAvatars'

const chatStyles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: theme.mixins.toolbar,
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const drawerWidth = 240;
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Starred" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
);

const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
  </div>
);

@connect((store) => {
  return {
    user: store.login.user,
  }
})
class ChatModal extends Component {
  state = {
    chatOpen: false,
    multiline: 'ff',
    chipData: [
      { key: 0, message: 'aaa', justifyContent: 'end', },
      { key: 1, message: 'bbb', justifyContent: 'end', },
      { key: 2, message: 'ccc', justifyContent: 'end', },
    ],
  }

  handleRequestChatClose = () => {
    this.setState({ chatOpen: false, });
    this.props.handleRequestChatClose(this.state.chatOpen);
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }
  handleEnter = event => {
  //  console.log(event.key);
  }
  starOnClick = () => {
    console.log('click');
  }
  rightEnter = () => {
    const { chipData, multiline } = this.state;
    if (multiline) {
      let newKey = this.state.chipData.length;
      let message = this.state.multiline;
      this.setState({
        chipData: chipData.concat({
          key: newKey,
          message,
          justifyContent: 'flex-end',
        }),
        multiline: '',
      });
    }

  }
  leftEnter = () => {
    const { chipData, multiline } = this.state;
    if (multiline) {
      let newKey = this.state.chipData.length;
      let message = this.state.multiline;
      this.setState({
        chipData: chipData.concat({
          key: newKey,
          message,
          justifyContent: 'end',
        }),
        multiline: '',
      });
    }
  }

  render() {
    const { classes } = this.props;
    const chips = this.state.chipData;
    const chipsRight = this.state.chipDataRight;
    const userImage = this.props.user.avatarEncodeImage;

    let c = chips.map((chip, i) => {
      return (
        <div key={i} className={classes.row} style={{justifyContent: chip.justifyContent}}>
          <Chip avatar={<Avatar src={"data:image/png;base64," + userImage} />} label={chip.message} key={chip.key} />
        </div>
      )
    });

    const drawer = (
      <div>
      <Drawer
        type="permanent"
        classes={{
          paperAnchorDockedLeft: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader} />
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </Drawer>
      </div>
    );

    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.chatOpen}
          onRequestClose={this.handleRequestChatClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleRequestChatClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Sound
              </Typography>
              <Button color="inherit" >
                save
              </Button>
            </Toolbar>
          </AppBar>

          <Grid container spacing={24}>
            <Grid item sm={3}>
              {drawer}
              <List>
                <ListItem button onClick={this.starOnClick}>
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
              <TextField
                id="multiline-flexible"
                label="Multiline"
                multiline
                rowsMax="4"
                value={this.state.multiline}
                onChange={this.handleChange('multiline')}
                className={classes.textField}
                margin="normal"
                fullWidth
                onKeyUp={this.handleEnter}
              />
              <Button onClick={this.rightEnter}>right Enter</Button>
              <Button onClick={this.leftEnter}>left Enter</Button>
              <Typography align="right">gg</Typography>
              <div>
                {c}
              </div>
{/*                {chips.map((chip, i) =>

                    <div key={i} className={classes.row}>
                      <Chip avatar={<Avatar src={"data:image/png;base64," + userImage.avatarEncodeImage} />} label={chip.message} key={chip.key} />
                    </div>

                )} */}
            </Grid>
          </Grid>
        </Dialog>
      </div>
    )
  }
}
ChatModal.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(chatStyles)(ChatModal);
