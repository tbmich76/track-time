import React from "react";
import {SessionRow} from "./sessionRow";
import {SessionsService} from "../services/sessions-service";

export class SessionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: []
    };
    this.sessionsService = new SessionsService();
  }
  componentDidMount() {
    this.sessionsService.getSessions().then(function(data) {
      this.setState({sessions: data});
    }.bind(this));
  }
  render() {
    var rows = [];
    this.state.sessions.forEach(function(session) {
      rows.push(<SessionRow session={session} key={session.id}/>);
    }.bind(this));
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <table className="table">
            <thead>
              <tr>
                <th>Session</th>
                <th>Date</th>
                <th>Track</th>
                <th>Best Time</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
SessionTable.propTypes = {
  source: React.PropTypes.string
};
