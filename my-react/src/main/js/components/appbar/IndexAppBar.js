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
  handleTest = () => {
    let chat = {
      to: "bbb",
      from: "aaa",
      message: "hi bbb",
      date: "2018-06-14",
    }
    console.log(window.location.protocol + "//" + window.location.host + "/handler")
    this.clientRef.sendMessage("/app/fff", JSON.stringify(chat))
  }
  handleNotification = (notification) => {
    console.log(notification)
    this.setState({notification, })
  }

	render() {
    const { classes } = this.props;

{/*    const sideList = (
      <div className={classes.list}>
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    const fullList = (
      <div className={classes.fullList}>
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    ); */}

		return (
			<div className={classes.root}>

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
            <Typography variant="title" color="inherit" className={classes.flex}>
              Title
            </Typography>

            <IconButton onClick={this.handleTest} color="secondary" className={classes.button} aria-label="Add to shopping cart">
	          	<AddShoppingCartIcon />
	          </IconButton>

            <Mail notification={this.state.notification} />

            <UserAvatar />

            <SockJsClient
              url={`http://localhost:8080/ws`}
              topics={['/user/topic/fff']}
              onMessage={(notification) => this.handleNotification(notification)}
              ref={ (client) => { this.clientRef = client }} />

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
