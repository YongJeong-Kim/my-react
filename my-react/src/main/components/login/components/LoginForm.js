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

class ComposedTextField extends React.Component {
  state = {
    username: 'Composed TextField',
    password: '',
  }

  handleChangeName = event => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };
  componentDidMount() {
    this.refs.form.onSubmit = () => this.handleSubmit();
  }
  handleSubmit = (e) => {
    console.log(this.state.username);
    console.log(this.state.password);
    e.preventDefault();
    var headers = {
        'Content-Type': 'application/json'
    }
    axios.post('/post', {
      username: this.state.username,
      password: this.state.password
    }, headers
  ).then( response => {
  		alert(response.data);
  	}).catch( error => {
      consoloe(error);
    });
  }

  render() {
    const classes = this.props.classes;

    return (
      <form ref="form" className={classes.container}  >
        <div className={classes.row}>
          <Avatar className={classes.pinkAvatar}>
            <PersonIcon />
          </Avatar>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-simple">Username</InputLabel>
            <Input id="name-simple" value={this.state.username} onChange={this.handleChangeName} />
          </FormControl>
        </div>
        <div className={classes.row}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-helper">Password</InputLabel>
            <Input id="name-helper" type="password" value={this.state.password} onChange={this.handleChangePassword} />
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
        </div>

        <div className={classes.row}>
          <Button  style={styleButton} className={classes.button} onClick={() => { history.push('/fff')}}>
            {'Login'}
          </Button>
        </div>
      </form>
    );
  }
}

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposedTextField);
