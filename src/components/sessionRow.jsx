import React from "react";
import {Link} from "react-router";

export class SessionRow extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={`/sessionDetails/${this.props.session.id}`}>{this.props.session.title}</Link>
        </td>
        <td>{this.props.session.date}</td>
        <td>{this.props.session.track}</td>
        <td>{this.props.session.bestTime}</td>
      </tr>
    );
  }
}
SessionRow.propTypes = {
  session: React.PropTypes.shape({title: React.PropTypes.string, date: React.PropTypes.string, track: React.PropTypes.string, bestTime: React.PropTypes.string})
};
