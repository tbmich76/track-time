import React from "react";
import {Link} from "react-router";
import {Header} from "./header";
import {Footer} from "./footer";
import {Aside} from "./aside";

export class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <main className="main">{this.props.children}</main>
        <Aside number="1"/>
        <Aside number="2"/>
        <Footer/>
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.node
};
