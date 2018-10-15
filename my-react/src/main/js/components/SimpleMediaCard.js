import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"

// material-ui components
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//material-ui colors and style
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import teal from '@material-ui/core/colors/teal';
import { withStyles } from '@material-ui/core/styles';

import EditModal from './modals/EditModal'

const cardStyles = {
  card: {
    maxWidth: 345,
    width: 345,
  },
  media: {
   height: 200,
    // height: 0,
    // paddingTop: '56.25%', // 16:9
  },
  nextLine: {
    whiteSpace: 'pre-line',
  },
}
const styles = theme => ({
  ...cardStyles,
});

const theme = createMuiTheme({
  palette: {
    primary: {
      ...teal,
      "500": "#B2DFDB",
    },
    secondary: {
      ...teal,
      "A200": "#004D40",
    },
  },
});

@connect((store) => {
  return {
    user: store.login.user,
  }
})
class SimpleMediaCard extends React.Component {
  state = {
    editOpen: false,
  };
  handleEditOpen = () => {
    this.setState({ editOpen: true, })
  }
  handleEditCancel = (editOpen) => {
    this.setState({ editOpen, })
  }
  handleEditEdit = (editOpen) => {
    this.setState({ editOpen, })
  }
  adminCheck = (roles) => {
    let isAdmin;
    for (let role of roles) {
      if (role === 'ROLE_ADMIN') {
        isAdmin = true;
        return isAdmin;
      }
      else
        isAdmin = false;
    }
    return isAdmin;
  }
  render() {
    const classes = this.props.classes;
    const userImage = this.props.user.encodeImage;
    const isAdmin = this.adminCheck(this.props.user.roles);
    const { headline, notification } = this.props.user;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={userImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {headline}
          </Typography>
          <Typography component="p" className={classes.nextLine}>
            {notification}
          </Typography>
        </CardContent>

        <MuiThemeProvider theme={theme} >
          <CardActions>
            {isAdmin &&
              <Button color="secondary" onClick={this.handleEditOpen}> {'edit'} </Button>
            }
            <EditModal editOpen={this.state.editOpen}
                       handleEditClose={this.handleEditCancel}
                       handleEditEdit={this.handleEditEdit} />
            <Button color="primary">
              Learn More
            </Button>
          </CardActions>
        </MuiThemeProvider>
      </Card>
    );
  }
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
