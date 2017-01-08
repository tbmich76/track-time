import React from "react";

export class SessionRow extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <a href="#">{this.props.session.title}</a>
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
