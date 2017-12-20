import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Badge from 'material-ui/Badge';
import MailIcon from 'material-ui-icons/Mail';
import FolderIcon from 'material-ui-icons/Folder';
import IconButton from 'material-ui/IconButton';
import { red } from 'material-ui/colors';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

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
function SimpleBadge(props) {
  const classes = props.classes;
  return (
    <div>
      <MuiThemeProvider theme={theme} >
        <IconButton color="contrast" aria-label="Menu" onClick={mailIconOnClick}>
          <Badge className={classes.badge} badgeContent={'99+'} >
            <MailIcon />
          </Badge>
        </IconButton>
          </MuiThemeProvider>
          <MuiThemeProvider theme={theme} >
        <IconButton color="contrast" aria-label="Menu">
          <Badge badgeContent={10} >
            <FolderIcon />
          </Badge>
        </IconButton>
      </MuiThemeProvider>
    </div>
  );
}

SimpleBadge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBadge);
