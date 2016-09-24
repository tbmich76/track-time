import React from "react";

export class App extends React.Component {
  render() {
    return (
      <div>
        <header></header>
        <main>{this.props.children}</main>
        <footer></footer>
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.node
};
