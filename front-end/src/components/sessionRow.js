var React = require('react');

var SessionRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td><a href="#">{this.props.session.title}</a></td>
        <td>{this.props.session.date}</td>
        <td>{this.props.session.track}</td>
        <td>{this.props.session.bestTime}</td>
      </tr>
    );
  }
});

module.exports = SessionRow;