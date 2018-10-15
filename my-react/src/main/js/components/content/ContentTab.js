import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'

// material ui cores
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// material ui icons
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

//material-ui colors and style
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import CloseIcon from '@material-ui/icons/Close';

import { setContentTab } from '../../actions/userActions'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
})

function TabContainer(props) {
  return (
    <Typography variant='body2' component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const tabTheme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
//      secondary: { main: ??},
  },
})

const tabDatas = [
  { title: "one", },
  { title: "two", },
  { title: "three", },
  { title: "four", },
  { title: "five", },
  { title: "six", },
  { title: "seven", },
]

@connect((store) => {
  return {
    user: store.login.user,
  }
})
class ContentTab extends Component {
  state = {

  }
  componentWillReceiveProps = (props) => {

  }
  handleChange = (event, value) => {
    const tabs = this.props.user.tab.tabs
    const changeSelectTab = {
      tabs,
      selected: value,
    }
    this.props.dispatch(setContentTab(changeSelectTab))
    this.setState({ value });
  }
  handleWheelClick = (e, tab) => {
    // 휠 클릭을 했을 때.
    if (e.button === 1) {
      if (tab.title.toLowerCase() === 'main' ) {

      }
      else {
        const tabs = this.props.user.tab
        const remainderTabs = tabs['tabs'].filter(t => t.title !== tab.title && t.value !== tab.value)
        // index와 value를 맞춤.
        remainderTabs.forEach((t, i) => {
          if (t.value !== i)
            t.value = i
          })

        let selectTab;
        // 투른 탭 === 닫은 탭
        if (tabs.selected === tab.value) {
          // 누른 탭이 마지막 탭?
          if (tabs.selected === tabs['tabs'].length - 1) { selectTab = tabs.selected - 1 }
          else { selectTab = tabs.selected }
        }
        // 누른 탭 < 닫은 탭
        else if (tabs.selected < tab.value) { selectTab = tabs.selected }
        // 누른 탭 > 닫은 탭
        else if (tabs.selected > tab.value) { selectTab = tabs.selected - 1 }

        const remainderNewTab = {
          tabs: remainderTabs,
          selected: selectTab,
        }

        this.props.dispatch(setContentTab(remainderNewTab))
      }
    }
  }

  render() {
    const { classes } = this.props;
    const tabs = this.props.user.tab && this.props.user.tab.tabs
    const selectedTab = this.props.user.tab && this.props.user.tab.selected

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <MuiThemeProvider theme={tabTheme}>
            <Tabs
              value={selectedTab}
              onChange={this.handleChange}
              scrollable
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              {tabs && tabs.map((tab, index) => (
                <Tab onMouseUp={(e) => this.handleWheelClick(e, tab)} label={tab.title} key={index} />
              ))}
            </Tabs>
          </MuiThemeProvider>
        </AppBar>


        {selectedTab === 0 &&
          <BrowserRouter>
            <TabContainer>
              <Headerrr />
              <Switch>
                <Route path="/nnn/zxc" component={zxc} />
                <Route path="/nnn/qwe" component={qwe} />
                <Route path="/nnn/asd" component={asd} />
              </Switch>
            </TabContainer>
          </BrowserRouter>
        }
        {selectedTab === 1 && <TabContainer>Item Two</TabContainer>}
        {selectedTab === 2 && <TabContainer>Item Three</TabContainer>}
        {selectedTab === 3 && <TabContainer>Item Four</TabContainer>}
        {selectedTab === 4 && <TabContainer>Item Five</TabContainer>}
        {selectedTab === 5 && <TabContainer>Item Six</TabContainer>}
        {selectedTab === 6 && <TabContainer>Item Seven</TabContainer>}
      </div>
    );
  }
}

const Headerrr = () => (
  <div>
    <ul>
      <li><Link to="/nnn/zxc">zxc</Link></li>
      <li><Link to="/nnn/qwe">qwe</Link></li>
      <li><Link to="/nnn/asd">asd</Link></li>
    </ul>
  </div>
)

const zxc = () => (
  <div>
    zxc
  </div>
)

const qwe = () => (
  <div>
    qwe
  </div>
)

const asd = () => (
  <div>
    asd
  </div>
)

ContentTab.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ContentTab);
