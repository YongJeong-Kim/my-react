import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import SockJsClient from 'react-stomp'

// material-ui components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// material-ui icons
import MenuIcon from '@material-ui/icons/Menu';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';

//material-ui colors and style
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

import Mail from './Mail';
import UserAvatar from './account/UserAvatar'
import { setContentTab } from "../../actions/userActions"
import MailSnackbar from './MailSnackbar'

const styles = {
  root: {
    /*marginTop: 30,*/
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  badge: {
    color: 'white',
    backgroundColor: blue[500],
  },
  input: {
    display: 'none',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

const mailDatas = [
  {
    icon: "<InboxIcon />",
    primary: "Inbox",
  },
  {
    icon: "<StarIcon />",
    primary: "Starred",
  },
  {
    icon: "<SendIcon />",
    primary: "Send mail",
  },
  {
    icon: "<DraftsIcon />",
    primary: "Drafts",
  },
]

let stompClient = null

@connect((store) => {
  return {
    user: store.login.user,
  }
})
class IndexAppBar extends React.Component {
  state = {
    open: false,
    notification: {
      to: "",
      from: "",
      date: "",
      message: "",
    },
    notificationOpen: false,
    clientConnected: false,
  }

  handleDrawer = () => {
    this.setState({ open: !this.state.open })
  }
  handleClick = (tabData) => {
    let tabs = this.props.user.tab && this.props.user.tab.tabs
    let isExistTabIndex = tabs.map(t => t.title).indexOf(tabData.primary)

    if (isExistTabIndex === -1) {
      let newTab = { title: tabData.primary, value: tabs.length, }
      tabs.push(newTab)

      const newTabData = {
        tabs: tabs,
        selected: tabs.length-1,
      }
      this.props.dispatch(setContentTab(newTabData))
    }
    else {
      let recentTab = {
        tabs,
        selected: tabs[isExistTabIndex].value,
      }
      this.props.dispatch(setContentTab(recentTab))
    }
  }
  handleMessage = (chat) => {
    console.log(this.state.clientConnected)
    if (this.state.clientConnected)
      this.clientRef.sendMessage("/app/snackbar/" + chat.to, JSON.stringify(chat))
  }
  handleNotification = (notification) => {
    console.log(notification)
    this.setState({notification, notificationOpen: true, })
  }
  handleNotificationClose = (notificationOpen) => {
    this.setState({notificationOpen, })
  }

	render() {
    const { classes } = this.props;
    const chat = {
      to: "aaa",
      from: this.props.user.username,
      fromAvatarImage: this.props.user.avatarEncodeImage,
      message: "ㅇㄴㅇㄴㄹㄷ",
      date: "2018-06-14",
    }

    return (
			<div className={classes.root}>
        <SockJsClient
          url={window.rootURI + 'handler'}
          topics={['/user/queue/snackbar']}
          onMessage={(notification) => this.handleNotification(notification)}
          onConnect={() => {this.setState({clientConnected: true})}}
          onDisconnect={() =>{this.setState({clientConnected: false})}}
          debug={false}
          ref={ (client) => { this.clientRef = client }} />

	      <AppBar position="static" className={classes.badge}>
	        <Toolbar>
            <IconButton className={classes.menuButton} onClick={this.handleDrawer} color="inherit" aria-label="Menu">
               <MenuIcon />
            </IconButton>
            <Drawer open={this.state.open} onClose={this.handleDrawer}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.handleDrawer}
                onKeyDown={this.handleDrawer}
              >
                {mailDatas.map((mailData, index) => (
                  <ListItem button onClick={() => this.handleClick(mailData)} key={mailData.primary + mailData.index}>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary={mailData.primary} />
                  </ListItem>
                ))}
              </div>
            </Drawer>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Title
            </Typography>
            <MailSnackbar notificationOpen={this.state.notificationOpen}
                          handleNotificationClose={this.handleNotificationClose}
                          notification={this.state.notification} />
            <IconButton onClick={() => this.handleMessage(chat)} color="secondary" className={classes.button} aria-label="Add to shopping cart">
	          	<AddShoppingCartIcon />
	          </IconButton>

            <Mail notification={this.state.notification} />

            <UserAvatar />
	        </Toolbar>
	      </AppBar>

		  </div>
		)
	}
}

IndexAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndexAppBar);
