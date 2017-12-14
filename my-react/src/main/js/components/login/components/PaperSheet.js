import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import LoginForm from './LoginForm';

const styles = theme => ({
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

function PaperSheet(props) {
  const classes = props.classes;
  return (
    <div className={classes.col}>
      <Paper className={classes.root} elevation={4} >
{/*        <Typography type="headline" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography type="body1" component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography> */}
        <LoginForm />
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
