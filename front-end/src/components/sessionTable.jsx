import React from "react";
import {SessionRow} from "./sessionRow";
import {Link} from "react-router";
import $ from "jquery";

export class SessionTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {sessions: []};
  }
  componentDidMount() {
    this.serverRequest = $.get(this.props.source, function(result) {
      this.setState({sessions: result});
    }.bind(this));
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  render() {
    var rows = [];
    this.state.sessions.forEach(function(session) {
      rows.push(<SessionRow session={session} key={session.id}/>);
    }.bind(this));
    return (
      <div className="sessions-container">
        <Link to="/sessionUpload">Upload a session</Link>
        <div className="sessions-header">
          <div className="session-cell">Session</div>
          <div className="session-cell">Date</div>
          <div className="session-cell">Track</div>
          <div className="session-cell">Best Time</div>
        </div>
        {rows}
      </div>
    );
  }
}
SessionTable.propTypes = {
  source: React.PropTypes.string
};
