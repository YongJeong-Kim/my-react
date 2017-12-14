import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

// material-ui icons
import MenuIcon from 'material-ui-icons/Menu';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
import AccountCircle from 'material-ui-icons/AccountCircle';

//material-ui colors and style
import { blue } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

import SimpleBadge from '../Badges';
import ImageAvatars from './ImageAvatars'

const styles = {
  root: {
    /*marginTop: 30,*/
    width: '100%',
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
let classes ;
class IndexAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

	handle(e) {
		this.setState({
			aa: 'aaaa',
			bb: 'bbbb',
		});
		alert(e.currentTarget);
	}

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  };

	render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

		return (
			<div className={classes.root}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
	      <AppBar position="static" className={classes.badge}>
	        <Toolbar>
	          <IconButton color="contrast" aria-label="Menu">
	            <MenuIcon />
	          </IconButton>
	          <Typography type="title" color="inherit" className={classes.flex}>
	            Title
	          </Typography>
	          <Button color="contrast" onClick={this.handle}>Login</Button>

            <form action="/logout" method="post">
              <input
                     className={classes.input}
                     id="raised-button-file"
                     multiple
                     type="submit"  />
              <label htmlFor="raised-button-file">
                <Button raised component="span" className={classes.button}>
                  Logout
                </Button>
              </label>
            </form>

	          <IconButton color="accent" className={classes.button} aria-label="Add to shopping cart">
	          	<AddShoppingCartIcon />
	          </IconButton>

            <SimpleBadge />

            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="contrast"
                >
                  {/*<AccountCircle /> */}
                  <ImageAvatars />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onRequestClose={this.handleRequestClose}
                >
                  <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
            {/*<ImageAvatars />*/}

	        </Toolbar>
	      </AppBar>
		  </div>
		)
	}
}

/*const aa = (e) => {
	alert(e.currentTarget);
}

function ButtonAppBar(props) {
  const classes = props.classes;
  console.log(props);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="contrast" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Title
          </Typography>
          <Button color="contrast" onClick={aa}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}*/

IndexAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndexAppBar);
