import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import axios from 'axios'

// material-ui components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AvatarMD from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

//material-ui colors and style
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

// react live chat
import { ThemeProvider, AgentBar, Column, Title, Subtitle, Avatar,
         MessageGroup, Message, MessageText,
         ChatList, ChatListItem, Row} from '@livechat/ui-kit'

const chatStyles = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: blue[500],
  },
  flex: {
    flex: 1,
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: 240,
  },
  drawerHeader: theme.mixins.toolbar,
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  selectedListItem: {
    '&:focus': {
      // backgroundColor: theme.palette.primary.main,
      backgroundColor: blue[300],
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

let currentLoggedUsers;

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
    isCurrentLoggedUsersCallback: false,
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
  findCurrentLoggedUsers = () => {
    if (this.state.isCurrentLoggedUsersCallback) {

    }
    else {
      axios.post("/user/currentLoggedUsers")
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
    const { classes } = this.props;
    const chips = this.state.chipData;
    const chipsRight = this.state.chipDataRight;
    const userImage = this.props.user.avatarEncodeImage;
    this.findCurrentLoggedUsers()

    let c = chips.map((chip, i) => {
      return (
        <div key={i} className={classes.row} style={{justifyContent: chip.justifyContent}}>
          <Chip avatar={<Avatar src={"data:image/png;base64," + userImage} />} label={chip.message} key={chip.key} />
        </div>
      )
    });

    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.chatOpen}
          onClose={this.handleRequestChatClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleRequestChatClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                ?
              </Typography>
              <Button color="inherit" >
                save
              </Button>
            </Toolbar>
          </AppBar>

          <Grid container spacing={24}>
            <Grid item sm={3}>
              <List>
                {this.state.isCurrentLoggedUsersCallback && currentLoggedUsers.map(currentLoggedUser => (
                  <ListItem button key={currentLoggedUser.username} className={classes.selectedListItem} onClick={this.starOnClick}>
                    <ListItemIcon>
                      <AvatarMD className={classes.icon} src={currentLoggedUser.avatarEncodeImage}></AvatarMD>
                    </ListItemIcon>
            {/*        <ListItemText className={classes.primary} primary={currentLoggedUser.username} secondary="Titania" style={{color: 'white'}}/> */}
                    <Grid container wrap="nowrap" >
                      <Grid item xs zeroMinWidth>
                        <Grid item>
                          <Typography className={classes.primary} noWrap>{currentLoggedUser.username}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography className={classes.primary} noWrap>message</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <ListItemSecondaryAction>
                      {'2018/07/07'}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item sm>
              <ThemeProvider>
                <ChatList style={{ maxWidth: 300 }}>
                  <ChatListItem>
                    <Avatar letter="K" />
                    <Column>
                      <Row justify>
                        <Title ellipsis>{'Konrad'}</Title>
                        <Subtitle nowrap>{'14:31 PM'}</Subtitle>
                      </Row>
                      <Subtitle ellipsis>
                        {'Hello, how can I help you? We have a lot to talk about'}
                      </Subtitle>
                    </Column>
                  </ChatListItem>
                  <ChatListItem active>
                    <Avatar letter="J" />
                    <Column>
                      <Row justify>
                        <Title ellipsis>{'Andrew'}</Title>
                        <Subtitle nowrap>{'14:31 PM'}</Subtitle>
                      </Row>
                      <Subtitle ellipsis>{'actually I just emailed you back'}</Subtitle>
                    </Column>
                  </ChatListItem>
                  <ChatListItem>
                    <Avatar imgUrl="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg" />
                    <Column>
                      <Row justify>
                        <Title ellipsis>{'Michael'}</Title>
                        <Subtitle nowrap>{'14:31 PM'}</Subtitle>
                      </Row>
                      <Subtitle ellipsis>
                        {"Ok, thanks for the details, I'll get back to you tomorrow."}
                      </Subtitle>
                    </Column>
                  </ChatListItem>
                </ChatList>
        			</ThemeProvider>
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
