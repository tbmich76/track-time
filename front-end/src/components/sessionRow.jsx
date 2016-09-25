import React from "react";

export class SessionRow extends React.Component {
  render() {
    return (
      <div className="session-row">
        <div className="cell">
          <a href="#">{this.props.session.title}</a>
        </div>
        <div className="cell">{this.props.session.date}</div>
        <div className="cell">{this.props.session.track}</div>
        <div className="cell">{this.props.session.bestTime}</div>
      </div>
    );
  }
}
SessionRow.propTypes = {
  session: React.PropTypes.shape({title: React.PropTypes.string, date: React.PropTypes.string, track: React.PropTypes.string, bestTime: React.PropTypes.string})
};
