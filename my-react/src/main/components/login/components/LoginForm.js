import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

import pink from 'material-ui/colors/pink';
import green from 'material-ui/colors/green';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';
import PageviewIcon from 'material-ui-icons/Pageview';
import AssignmentIcon from 'material-ui-icons/Assignment';
import PersonIcon from 'material-ui-icons/Person';
import LockIcon from 'material-ui-icons/Lock';

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
});

class ComposedTextField extends React.Component {
  state = {
    name: 'Composed TextField',
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <div className={classes.row}>
          <Avatar className={classes.pinkAvatar}>
            <PersonIcon />
          </Avatar>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-simple">Username</InputLabel>
            <Input id="name-simple" value={this.state.name} onChange={this.handleChange} />
          </FormControl>
        </div>
        <div className={classes.row}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-helper">Password</InputLabel>
            <Input id="name-helper" type="password" value={this.state.name} onChange={this.handleChange} />
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
        </div>
        <FormControl className={classes.formControl} disabled>
          <InputLabel htmlFor="name-disabled">Name</InputLabel>
          <Input id="name-disabled" value={this.state.name} onChange={this.handleChange} />
          <FormHelperText>Disabled</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} error>
          <InputLabel htmlFor="name-error">Name</InputLabel>
          <Input id="name-error" value={this.state.name} onChange={this.handleChange} />
          <FormHelperText>Error</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposedTextField);
