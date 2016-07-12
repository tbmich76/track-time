"use strict";

require('bootstrap-webpack!../bootstrap.config.js');
require("jquery");

var React = require('react');
var ReactDOM = require('react-dom');
var Home = require("./components/homePage.js");

ReactDOM.render(<Home />, document.getElementById("app"));

