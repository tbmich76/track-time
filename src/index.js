import React from "react";
import {render} from "react-dom";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import {App} from "./components/app";
import {Home} from "./components/homePage";
import {SessionUpload} from "./components/sessionUpload";
import {SessionDetails} from "./components/sessionDetails";

import "jquery";
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'leaflet/dist/leaflet.js';

import "./style.less";

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="sessionUpload" component={SessionUpload}/>
      <Route path="sessionDetails/:sessionId" component={SessionDetails}/>
    </Route>
  </Router>
), document.getElementById("app"));
