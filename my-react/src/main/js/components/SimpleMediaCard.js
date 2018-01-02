import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';

import { connect } from "react-redux"

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

const btnStyles = theme => ({
  button : {
    color: theme.status.color,
  }
});

const theme = createMuiTheme({
  status: {
    color: orange[300],
  }
});

let Btns = props =>
  <Button dense color="primary" className={props.classes.button}>
    Share
  </Button>;

Btns = withStyles(btnStyles)(Btns);


@connect((store) => {
  return {
    user: store.login.user,
    roles: store.login.roles,
  }
})
class SimpleMediaCard extends React.Component {

  render() {
    const classes = this.props.classes;
    const userImage = this.props.user.userImage;

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={"data:image/png;base64," + userImage.encodeImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography type="headline" component="h2">
              Lizard
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
      {/*      <MuiThemeProvider theme={theme} >
                <Btns />
            </MuiThemeProvider>*/}
                <Button raised color="primary">
                  Learn More
                </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

{/*
function SimpleMediaCard(props) {
  const classes = props.classes;

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={"data:image/png;base64," + props.avatar.encodeImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography type="headline" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>

              <Button raised color="primary">
                Learn More
              </Button>
        </CardActions>
      </Card>
    </div>
  );
}*/}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
