var SessionRow = require('./sessionRow.js');

var React = require('react');

var SessionTable = React.createClass({
  render: function() {
    var rows = [];
    this.props.sessions.forEach(function(session) {
      rows.push(<SessionRow session={session} key={session.name} />);
    }.bind(this));
    return (
      <table className="table table-striped">
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
    );
    }
});

module.exports = SessionTable;