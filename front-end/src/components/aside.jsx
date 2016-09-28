import React from "react";

export class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.className="aside aside-" + props.number;
  }
  render() {
    return (<aside className={this.className}></aside>);
  }
}
