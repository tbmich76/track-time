var React = require('react');

var SessionRow = React.createClass({
    render: function() {
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
});

module.exports = SessionRow;
