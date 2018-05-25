import React from 'react';
import PropTypes from 'prop-types';
import {Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { connect } from "react-redux"

// material-ui components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IndexAppBar from './appbar/IndexAppBar';

//material-ui colors and style
import { withStyles } from '@material-ui/core/styles';

import { fetchUser, setUserName, getLoginUserInfo } from "../actions/userActions"
import SimpleMediaCard from './SimpleMediaCard';

const styles = theme => ({
  root: {
    flexGrow: 1,
/*    marginTop: 30, */
  },
});

@connect((store) => {
  return {
    user: store.login.user,
  }
})
class App extends React.Component {
  state = {
    receiveProps: false,
  }

  componentWillMount() {
    this.props.dispatch(getLoginUserInfo());
  }

  componentWillReceiveProps() {
    this.setState({
      receiveProps: true,
    });
  }

	render() {
    const classes = this.props.classes;
		return (
			<div className={classes.root} >
				<Grid container spacing={24}>
					<Grid item xs>
						<IndexAppBar />
					</Grid>
				</Grid>
				<Grid container spacing={24}>
					<Grid item >
            {this.state.receiveProps &&
              <SimpleMediaCard />
            }
					</Grid>
					<Grid item xs={8} >
						<div>sdfsdfdfsdf</div>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(App);
