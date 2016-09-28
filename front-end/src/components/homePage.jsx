import React from "react";
import {Link} from "react-router";
import {SessionTable} from "./sessionTable";

export class Home extends React.Component {
  render() {
    return (
      <div className="leaderboard">
				<div className="actions">
					<Link to="/sessionUpload">Upload a session</Link>
				</div>
        <SessionTable source="https://g5bgaxge4j.execute-api.ap-southeast-2.amazonaws.com/prod/sessions"/>
      </div>
    );
  }
}
