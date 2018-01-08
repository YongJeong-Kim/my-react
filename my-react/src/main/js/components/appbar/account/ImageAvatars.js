import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
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

@connect((store) => {
  return {
    user: store.login.user,
  }
})
class ImageAvatars extends Component {
  render() {
    const { classes, noMargin } = this.props;
    const userImage = this.props.user.avatarEncodeImage;
    let Avar = null;

    if (noMargin === "true") {
      Avar = <div className={classes.row}>
              <Avatar alt="Remy Sharp" src={userImage} />
             </div>
    } else {
      Avar = <div className={classes.row}>
              <Avatar alt="Remy Sharp" src={userImage} className={classes.avatar} />
             </div>
    }

    return (
      <div>
        {Avar}
      </div>
    )
  }
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);
