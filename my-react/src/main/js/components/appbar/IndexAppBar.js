import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

// material-ui icons
import MenuIcon from 'material-ui-icons/Menu';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
import AccountCircle from 'material-ui-icons/AccountCircle';

//material-ui colors and style
import { blue } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

import SimpleBadge from '../Badges';
import UserAvatar from './account/UserAvatar'

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
};

class IndexAppBar extends React.Component {

	render() {
    const { classes } = this.props;

		return (
			<div className={classes.root}>

	      <AppBar position="static" className={classes.badge}>
	        <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
               <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Title
            </Typography>

	          <IconButton color="secondary" className={classes.button} aria-label="Add to shopping cart">
	          	<AddShoppingCartIcon />
	          </IconButton>

            <SimpleBadge />

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
