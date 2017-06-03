import React from "react";
import {render} from "react-dom";
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import Root from "./components/root";
import "jquery";
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'leaflet/dist/leaflet.js';

import "./style.less";

const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )

render(
  <Root store={store} />,
   document.getElementById('app')
 )
