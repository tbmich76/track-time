'use strict';

var React = require('react');

var SessionTable = require('./sessionTable');

var Home = React.createClass({
    render: function() {
        return (<SessionTable source="https://g5bgaxge4j.execute-api.ap-southeast-2.amazonaws.com/prod/sessions"/>);
    }
});

module.exports = Home;
