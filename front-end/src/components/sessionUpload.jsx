var React = require('react');

var SessionUpload = React.createClass({
    render: function() {
        return (
            <div>
                <form method="post">
                    <input type="file"/>
                </form>
            </div>
        );
    }
});

module.exports = SessionUpload;
