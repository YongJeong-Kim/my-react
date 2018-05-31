import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"

// material-ui components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

//material-ui colors and style
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ImageAvatars from '../ImageAvatars'
import { NoMarginImageAvatars } from '../ImageAvatars'
import { setUserProfile } from "../../../../actions/userActions"

const profileStyles = theme => ({
  root: {
    display: 'flex',
  },
  popperClose: {
    pointerEvents: 'none',
  },
  container: {
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    marginBottom: 10,
    display: 'flex',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  flex: {
    flex: 1,
  },
  input: {
    display: 'none',
  },
  cssFocusedLabel: {
    '&$cssFocused': {
      color: blue[500],
    },
  },
  cssFocused: {},
  inputInkbar: {
    '&:after': {
      backgroundColor: blue[500],
    },
  },
})

const buttonTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

@connect((store) => {
  return {
    user: store.login.user,
  }
})
class ProfileModal extends Component {
  state = {
    profileOpen: false,
    profile: {
      name: 'aaa',
      email: 'aaa@email.com',
      imagePreviewUrl: this.props.user.avatarEncodeImage,
      file: '',
    }
  }

  handleRequestProfileClose = () => {
    let profile = this.state.profile;

    profile.imagePreviewUrl = this.props.user.avatarEncodeImage;
    this.setState({ profileOpen: false, profile, });
    this.props.handleRequestProfileClose(this.state.profileOpen);
  }
  onChangeProfileEmail = (e) => {
    let profile = this.state.profile;
    profile.email = e.target.value;
    this.setState(prevState => ({ profile: prevState.profile }));
  }
  onChangeProfileName = (e) => {
    let profile = this.state.profile;
    profile.name = e.target.value;
    this.setState({ profile, });
  }
  handleOnChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file.type.includes('image')) {
      reader.onloadend = () => {
        this.setState({
          profile: {
            ...this.state.profile,
            file,
            imagePreviewUrl: reader.result,
          },
        });
      }
      reader.readAsDataURL(file);
    }
  }
  handleSubscribe = () => {
    const { profile } = this.state;
    this.props.dispatch(setUserProfile(profile));
    this.setState({ profileOpen: false, });
    this.props.handleRequestProfileClose(this.state.profileOpen);
  }
  render() {
    const { classes } = this.props;
    const avatarImage = this.props.user.avatarEncodeImage;
    const { profile } = this.state;
    let profileImage = null;

    if (profile.imagePreviewUrl)
      profileImage = <Avatar alt="No Image" src={profile.imagePreviewUrl} className={classes.bigAvatar} />
    else
      profileImage = <Avatar alt="No Image" src={avatarImage} className={classes.bigAvatar} />
    return (
      <div>
        <Dialog open={this.props.profileOpen} disableBackdropClick >
          <DialogTitle>Profile</DialogTitle>

          <DialogContent>
            <div className={classes.container}>
              <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={this.handleOnChange} />
              <label htmlFor="icon-button-file">
                {profileImage}
              </label>
              <FormControl className={classes.formControl} >
              <InputLabel
                FormLabelClasses={{root: classes.cssFocusedLabel, focused: classes.cssFocused,}}
                htmlFor="name-simple">Name</InputLabel>
                <Input id="name-disabled" classes={{underline: classes.inputInkbar,}} value={this.state.profile.name} onChange={this.onChangeProfileName}/>
                {/*<FormHelperText>Disabled</FormHelperText> */}
              </FormControl>
              <FormControl className={classes.formControl} >
              <InputLabel
                FormLabelClasses={{root: classes.cssFocusedLabel, focused: classes.cssFocused,}}
                htmlFor="name-disabled">Email</InputLabel>
                <Input id="name-disabled" classes={{underline: classes.inputInkbar,}} value={this.state.profile.email} onChange={this.onChangeProfileEmail}/>
                {/*<FormHelperText>Disabled</FormHelperText> */}
              </FormControl>
            </div>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occationally.
            </DialogContentText>
          </DialogContent>
          <MuiThemeProvider theme={buttonTheme}>
            <DialogActions>
              <Button onClick={this.handleRequestProfileClose} color="secondary" >
                Cancel
              </Button>
              <Button onClick={this.handleSubscribe} color="primary" >
                Subscribe
              </Button>
            </DialogActions>
          </MuiThemeProvider>
        </Dialog>
      </div>
    )
  }
}
ProfileModal.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(profileStyles)(ProfileModal);
