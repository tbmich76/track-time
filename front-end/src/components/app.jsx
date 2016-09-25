import React from "react";
import {Link} from "react-router";

export class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.node
};
