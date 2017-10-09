import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';

import SimpleBadge from './Badges';
import { blue } from 'material-ui/colors';

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
};
let classes ;
class ButtonAppBar extends React.Component {

	constructor(props) {
		super(props);
		classes = props.classes;
		this.state = {
			aa: 'aa',
			bb: 'bb'
		};
		this.handle = this.handle.bind(this);
	}

	handle(e) {
		this.setState({
			aa: 'aaaa',
			bb: 'bbbb',
		});
		alert(e.currentTarget);
	}

	render() {
		return (
			<div className={classes.root}>
		      <AppBar position="static" className={classes.badge}>
		        <Toolbar>
		          <IconButton color="contrast" aria-label="Menu">
		            <MenuIcon />
		          </IconButton>
		          <Typography type="title" color="inherit" className={classes.flex}>
		            Title
		          </Typography>
		          <Button color="contrast" onClick={this.handle}>Login</Button>
		          <IconButton color="accent" className={classes.button} aria-label="Add to shopping cart">
		          	<AddShoppingCartIcon />
		          </IconButton>

              <SimpleBadge />

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

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
