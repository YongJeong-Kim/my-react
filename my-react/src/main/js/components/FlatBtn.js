import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
//import purple from 'material-ui/colors/purple';
import yellow from 'material-ui/colors/yellow';
import red from 'material-ui/colors/red';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { purple } from 'material-ui/colors';

import axios from 'axios';

const styles = theme => ({
		checked: {
	    color: red[50],
	  },
		button: {
			color: theme.status.color,
		}
});

const theme = createMuiTheme({
	status: {
		color: yellow['A700'],
	}
});
let Bbtns = props =>
	<Button className={props.classes.button} onClick={dd} data-id="11">
		{'Primary'}
	</Button>;
Bbtns = withStyles(styles)(Bbtns);

function dd() {
	alert(purple[50]);
	alert(red);
	axios.get('/uuu')
	.then( response => {
		alert(response.data);
	});
}
function Palette(props) {
	const classes = props.classes;
  return (
    <MuiThemeProvider theme={theme}>
      <div>
				<Bbtns />
        <Button color="accent">
				  {'Accent'}
        </Button>
      </div>
    </MuiThemeProvider>
  );
}

export default Palette;
