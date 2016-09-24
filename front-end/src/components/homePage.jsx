import React from "react";
import {SessionTable} from "./sessionTable";

export class Home extends React.Component {
  render() {
    return (<SessionTable source="https://g5bgaxge4j.execute-api.ap-southeast-2.amazonaws.com/prod/sessions"/>);
  }
}
