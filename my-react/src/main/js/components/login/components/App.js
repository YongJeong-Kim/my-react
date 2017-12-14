import React from 'react';
import PaperSheet from './PaperSheet';
import { connect } from "react-redux"

@connect((store) => {
  return {
    user: store.user,
  };
})
export default class App extends React.Component {

  componentWillMount() {

    }

  render() {
    return(
      <PaperSheet />
    );
  }
}
