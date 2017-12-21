import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import Button from 'material-ui/Button';
import Palette from './FlatBtn';
import IndexAppBar from './appbar/IndexAppBar';

import FlatButtons from './FlatBtn2';
import FloatingActionButtons from './ActionBtn';

import LongMenu from './LongMenu';
import BusinessVariables from './CheckBoxCus';

import SimpleDialogDemo from './SimpleDialogDemo';
import SimpleMediaCard from './SimpleMediaCard';


import NestedList from './Lists';

import {Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import { connect } from "react-redux"

import { fetchUser, setUserName, getLoginUserInfo } from "../actions/loginActions"


let classes;
const styles = theme => ({
  root: {
    flexGrow: 1,
/*    marginTop: 30, */
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

@connect((store) => {
  return {
    user: store.login.user,
    roles: store.login.roles,
  }
})
class App extends React.Component {

	constructor(props) {
		super(props);
		classes = props.classes;
	}

  componentWillMount() {
    this.props.dispatch(getLoginUserInfo());
  }

	render() {
    console.log('login success');
    console.log(this.props.user);
		return (
			<div className={classes.root} >
				<Grid container spacing={24}>
					<Grid item xs>
						<IndexAppBar />
					</Grid>
				</Grid>
				<Grid container spacing={24}>
					<Grid item md={2}>
						<SimpleMediaCard />
						<NestedList />
					</Grid>
					<Grid item xs >
						<BusinessVariables />
						<Palette />
						<FlatButtons />
						<FloatingActionButtons />
						<SimpleDialogDemo />
						<LongMenu />
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(App);
