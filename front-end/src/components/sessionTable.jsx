var React = require('react');
var SessionUpload = require('./sessionUpload');
var SessionRow = require('./sessionRow');
import {Link} from 'react-router'

var SessionTable = React.createClass({
    onDrop: function(files) {
        console.log('Received files: ', files);
    },
    getInitialState: function() {
        return {sessions: []};
    },
    componentDidMount: function() {
        this.serverRequest = $.get(this.props.source, function(result) {
            this.setState({sessions: result});
        }.bind(this));
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render: function() {
        var rows = [];
        this.state.sessions.forEach(function(session) {
            rows.push(<SessionRow session={session} key={session.name}/>);
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
});

module.exports = SessionTable;
