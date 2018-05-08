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
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

//material-ui colors and style
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import { withStyles } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { setUserCard } from "../../actions/userActions"

const inputStyles = {
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
  disableScrollY: {
    overflowY: 'hidden',
  },
}
const cardStyles = {
  root: {
    width: '100%',
    maxWidth: 345,
    width: 345,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
}
const editStyles = theme => ({
  popperClose: {
    pointerEvents: 'none',
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
  ...inputStyles,
  ...cardStyles,
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
class EditModal extends Component {

  state = {
    editOpen: false,
    edit: {
      encodeImage: '',
      headline: 'dd',
      notification: 'noti',
    },
  };

  handleOnChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file.type.includes('image')) {
      reader.onloadend = () => {
        this.setState({
          edit: {
            ...this.state.edit,
            encodeImage: reader.result,
          },
        });
      }
      reader.readAsDataURL(file);
    }
  }

  onChangeEditHeadLine = (e) => {
    let edit = this.state.edit;
    edit.headline = e.target.value;
    this.setState({ edit, });
  }
  onChangeEditNotification = (e) => {
    let edit = this.state.edit;
    edit.notification = e.target.value;
    this.setState({ edit, });
  }
  handleEditCancel = () => {
    let edit = this.state.edit;
    let propsUser = this.props.user;
    edit.encodeImage = propsUser.encodeImage;
    edit.headline = propsUser.headline;
    edit.notification = propsUser.notification;
    this.setState({ editOpen: false, edit, });
    this.props.handleEditClose(this.state.editOpen);
  }
  handleEditEdit = () => {
    this.setState({ editOpen: false, })
    this.props.dispatch(setUserCard(this.state.edit));
    this.props.handleEditEdit(this.state.editOpen);
  }
  componentWillMount = () => {
    const { headline, notification } = this.props.user;
    let edit = this.state.edit;
    edit.headline = headline;
    edit.notification = notification;

    this.setState({ edit, });
  }

  render() {
    const { classes } = this.props;
    const userImage = this.props.user.encodeImage;
    let encodeImage = null;
    if (this.state.edit.encodeImage)
      encodeImage = <CardMedia
                      className={classes.media}
                      image={this.state.edit.encodeImage}
                      title="Contemplative Reptile"
                    />
    else
      encodeImage = <CardMedia
                      className={classes.media}
                      image={userImage}
                      title="Contemplative Reptile"
                    />

    return (
      <Dialog open={this.props.editOpen} disableBackdropClick >
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <Card className={classes.card}>
              <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={this.handleOnChange} />
              <label htmlFor="icon-button-file">
                {encodeImage}
              </label>

              <CardContent>
                <FormControl fullWidth className={classes.formControl} >
                  <InputLabel
                    FormLabelClasses={{root: classes.cssFocusedLabel, focused: classes.cssFocused,}}
                    htmlFor="name-simple">Headline</InputLabel>
                  <Input
                    classes={{underline: classes.inputInkbar,}}
                    className={classes.disableScrollY}
                    id="name-simple"
                    value={this.state.edit.headline}
                    onChange={this.onChangeEditHeadLine} />
                </FormControl>
                <FormControl fullWidth className={classes.formControl} >
                  <InputLabel
                    FormLabelClasses={{root: classes.cssFocusedLabel, focused: classes.cssFocused,}}
                    htmlFor="name-disabled">{'Notification'}</InputLabel>
                  <Input
                    classes={{underline: classes.inputInkbar,}}
                    id="name-disabled"
                    multiline
                    rows="5"
                    value={this.state.edit.notification}
                    onChange={this.onChangeEditNotification} />
                </FormControl>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
        <MuiThemeProvider theme={buttonTheme}>
          <DialogActions>
            <Button color="secondary" onClick={this.handleEditCancel}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleEditEdit}>
              Edit
            </Button>
          </DialogActions>
        </MuiThemeProvider>
      </Dialog>
    )
  }
}
EditModal.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(editStyles)(EditModal);
