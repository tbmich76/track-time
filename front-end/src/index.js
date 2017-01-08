import React from "react";
import {render} from "react-dom";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import {App} from "./components/app";
import {Home} from "./components/homePage";
import {SessionUpload} from "./components/sessionUpload";

import "jquery";
import "bootstrap/dist/js/bootstrap";

import "./style.less";

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="sessionUpload" component={SessionUpload}/>
    </Route>
  </Router>
), document.getElementById("app"));
