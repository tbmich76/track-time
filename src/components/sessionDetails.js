import React from "react";
import {SessionsService} from "../services/sessions-service";
import {TrackMap} from "./track-map"

export class SessionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {},
      loaded: false
    };
    this.sessionsService = new SessionsService();
  }
  componentDidMount() {
    this.sessionsService.getSession(this.props.params.sessionId).then(function(data) {
      this.setState({session: data, loaded: true});
    }.bind(this));
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>{this.state.session.title}</h1>
          {!this.state.loaded
            ? <div>Loading...</div>
            : <TrackMap session={this.state.session}/>
          }
        </div>
      </div>
    );
  }
}
