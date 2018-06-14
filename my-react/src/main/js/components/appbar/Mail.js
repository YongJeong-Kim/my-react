import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import FolderIcon from '@material-ui/icons/Folder';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles = theme => ({
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

const theme = createMuiTheme({
  overrides: {
    MuiBadge: {
      badge: {
        backgroundColor: red[500],
      }
    }
  }
});

const mailIconOnClick = () => {
  alert();
}
class Mail extends Component {
  state = {
    messageCount: 95,
    messageStringCount: '95',
  }

  componentWillReceiveProps = (props) => {
    if (props.notification.to) {
      const messageCount = this.state.messageCount + 1
      let messageStringCount = ''

      this.setState({messageCount, }, () => {
         messageStringCount = this.state.messageCount > 99? '99+' : this.state.messageCount + ''
         this.setState({messageStringCount, })
      })
    }
  }

  render() {
    const classes = this.props.classes;
    const notification = this.props.notification

    return (
      <div>
        <MuiThemeProvider theme={theme} >
          <IconButton color="inherit" aria-label="Menu" onClick={mailIconOnClick}>
            <Badge className={classes.badge} badgeContent={this.state.messageStringCount} >
              <MailIcon />
            </Badge>
          </IconButton>
        </MuiThemeProvider>
        <MuiThemeProvider theme={theme} >
          <IconButton color="inherit" aria-label="Menu">
            <Badge badgeContent={10} >
              <FolderIcon />
            </Badge>
          </IconButton>
        </MuiThemeProvider>
      </div>
    );
  }
}

Mail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mail);
