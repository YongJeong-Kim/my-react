import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"

// material-ui components
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';

//material-ui colors and style
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import { withStyles } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import ImageAvatars from '../ImageAvatars'
import { NoMarginImageAvatars } from '../ImageAvatars'
import { setUserProfile } from "../../../../actions/loginActions"

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
})

const buttonTheme = createMuiTheme({
  palette: {
    primary: {
      ...blue,
      "900": "#0D47A1",
    }, // Purple and green play nicely together.
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
    modified: false,
    profile: {
      name: 'aaa',
      email: 'aaa@email.com',
      imagePreviewUrl: '',
      file: '',
    }
  }

  handleRequestProfileClose = () => {
    this.setState({ profileOpen: false, });
    this.props.handleRequestProfileClose(this.state.profileOpen);
  }
  onChangeProfileEmail = (e) => {
    console.log(e.target.value);
    this.setState({ profile: { email: e.target.value }});
  }
  handleOnChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file.type.includes('image')) {
      reader.onloadend = () => {
        this.setState({ profile: {...this.state.profile, file, imagePreviewUrl: reader.result }});
      }
      reader.readAsDataURL(file);
    }
  }
  handleSubcribe = () => {
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
        <Dialog open={this.props.profileOpen} ignoreBackdropClick >
          <DialogTitle>Profile</DialogTitle>

          <DialogContent>
            <div className={classes.container}>
              <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={this.handleOnChange} />
              <label htmlFor="icon-button-file">
                {profileImage}
              </label>
              <FormControl className={classes.formControl} >
                <InputLabel htmlFor="name-disabled">Name</InputLabel>
                <Input id="name-disabled" value={this.state.profile.name} />
                {/*<FormHelperText>Disabled</FormHelperText> */}
              </FormControl>
              <FormControl className={classes.formControl} >
                <InputLabel htmlFor="name-disabled">Email</InputLabel>
                <Input id="name-disabled" value={this.state.profile.email} onChange={this.onChangeProfileEmail}/>
                {/*<FormHelperText>Disabled</FormHelperText> */}
              </FormControl>
            </div>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occationally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <MuiThemeProvider theme={buttonTheme}>
            <DialogActions>
              <Button onClick={this.handleRequestProfileClose} color="accent" >
                Cancel
              </Button>
              <Button onClick={this.handleSubcribe} color="primary" >
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
