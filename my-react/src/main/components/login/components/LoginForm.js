import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';

import pink from 'material-ui/colors/pink';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';
import PageviewIcon from 'material-ui-icons/Pageview';
import AssignmentIcon from 'material-ui-icons/Assignment';
import PersonIcon from 'material-ui-icons/Person';
import LockIcon from 'material-ui-icons/Lock';

import axios from 'axios';
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  container: {
    // display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  avatar: {
   margin: 10,
  },
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
  label: {
    textTransform: 'capitalize',
  },
  input: {
    display: 'none',
  },
});

const styleButton = {
  background: blue[500],
};

class LoginForm extends React.Component {
  state = {
    username: 'aaa',
    password: '1234',
  }

  handleChangeName = event => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (e) => {
    console.log(this.state.username);
    console.log(this.state.password);

    console.log("login clicked.");

{/*    var headers = {
        'Content-Type': 'application/json'
    }
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    }, headers
  ).then( response => {
  		alert(response.data);

  	}).catch( error => {
      consoloe(error);
    });*/}
  }

  testSubmit = (e) => {

    axios.get('http://localhost:3000/qqq')
    .then((response) => {
    window.location = '/';
    });
  }


  render() {
    const classes = this.props.classes;
    const actionUrl = 'http://localhost:3000/login';
{/*    let metas = document.getElementsByTagName('meta');
    let metaValue = metas[0].content;
    let metaName = metas[1].content;
    console.log(metas);
    console.log(metaValue);
    console.log(metaName); */}
    console.log(actionUrl);
    return (
      <form action={actionUrl} method="post" className={classes.container} onSubmit={this.handleSubmit}>
        <div className={classes.row}>
          <Avatar className={classes.pinkAvatar}>
            <PersonIcon />
          </Avatar>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-simple">Username</InputLabel>
            <Input id="name-simple" name="username" value={this.state.username} onChange={this.handleChangeName} />
          </FormControl>
        </div>
        <div className={classes.row}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-helper">Password</InputLabel>
            <Input id="name-helper" type="password" name="password" value={this.state.password} onChange={this.handleChangePassword} />
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
        </div>

  {/*      <div className={classes.row}>
          <Button type="submit" style={styleButton} className={classes.button} >
            {'Login'}
          </Button>
        </div>  */}

        <div className={classes.row}>
          <input
                 className={classes.input}
                 id="raised-button-file"
                 multiple
                 type="submit"  />
          <label htmlFor="raised-button-file">
            <Button type="submit" raised component="span" style={styleButton} className={classes.button}>
              Login
            </Button>
          </label>
        </div>
  {/*      <input type="hidden" name={metaName} value={metaValue} /> */}
      </form>

    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
