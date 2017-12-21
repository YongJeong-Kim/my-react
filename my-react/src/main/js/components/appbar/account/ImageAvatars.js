import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

function ImageAvatars(props) {
  const { classes, noMargin } = props;

  let Avar = null;
  if (noMargin === "true") {
    Avar = <div className={classes.row}>
            <Avatar alt="Remy Sharp" src="/images/ggobu2.png" />
           </div>
  } else {
    Avar = <div className={classes.row}>
            <Avatar alt="Remy Sharp" src="/images/ggobu2.png" className={classes.avatar} />
           </div>
  }

  return (
    <div>
      {Avar}
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);
