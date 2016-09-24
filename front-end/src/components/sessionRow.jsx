import React from "react";

export class SessionRow extends React.Component {
  render() {
    return (
      <div className="session">
        <div className="session-cell">
          <a href="#">{this.props.session.title}</a>
        </div>
        <div className="session-cell">{this.props.session.date}</div>
        <div className="session-cell">{this.props.session.track}</div>
        <div className="session-cell">{this.props.session.bestTime}</div>
      </div>
    );
  }
}
SessionRow.propTypes = {
  session: React.PropTypes.shape({title: React.PropTypes.string, date: React.PropTypes.string, track: React.PropTypes.string, bestTime: React.PropTypes.string})
};
