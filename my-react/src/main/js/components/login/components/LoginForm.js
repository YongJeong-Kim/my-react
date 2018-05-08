import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

// material-ui components
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

// material-ui icons
import FolderIcon from 'material-ui-icons/Folder';
import PageviewIcon from 'material-ui-icons/Pageview';
import AssignmentIcon from 'material-ui-icons/Assignment';
import PersonIcon from 'material-ui-icons/Person';
import LockIcon from 'material-ui-icons/Lock';

//material-ui colors and style
import pink from 'material-ui/colors/pink';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    // display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  inputLabelFocused: {
    color: blue[500],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: blue[500],
    },
  },
  lock: {
   margin: 10,
   color: '#fff',
   backgroundColor: blue[500],
  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: blue[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing.unit,
    color: '#fff',
  },
  label: {
    textTransform: 'capitalize',
  },
  input: {
    display: 'none',
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    maxWidth: '900px',
    margin: '0 auto',
  }),
  col: {
    display: 'flex',
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

  componentWillMount() {


{/*    axios.get('http://localhost:3000/qqq')
    .then((response) => {
    window.location = '/';
    }); */}
  }

  render() {
    const classes = this.props.classes;

{/*    let metas = document.getElementsByTagName('meta');
    let metaValue = metas[0].content;
    let metaName = metas[1].content;
    console.log(metas);
    console.log(metaValue);
    console.log(metaName); */}

    return (
      <div className={classes.col}>
        <Paper className={classes.root} elevation={4} >
          <form action="/login" method="post" className={classes.container} onSubmit={this.handleSubmit}>
            <div className={classes.row}>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
              <FormControl className={classes.formControl}>
                <InputLabel
                  FormLabelClasses={{
                    focused: classes.inputLabelFocused }}
                  htmlFor="name-simple">Username</InputLabel>
                <Input classes={{underline: classes.inputInkbar}} id="name-simple" name="username" value={this.state.username} onChange={this.handleChangeName} />
              </FormControl>
            </div>
            <div className={classes.row}>
              <Avatar className={classes.lock}>
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
                     type="submit" />
              <label htmlFor="raised-button-file" >
                <Button type="submit" component="span" style={styleButton} className={classes.button}>
                  Login
                </Button>
              </label>
            </div>


      {/*      <input type="hidden" name={metaName} value={metaValue} /> */}
          </form>
        </Paper>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
