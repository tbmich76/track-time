import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../containers/home';
import SessionUpload from './sessionUpload';
import SessionDetails from '../containers/session-container';

const Main = () => (
  <div className="row">
    <div className="col-md-12">
      <main className="main">
        <Route exact path='/' component={Home}/>
        <Route path="/sessionUpload" component={SessionUpload}/>
        <Route path="/sessionDetails/:sessionId" component={SessionDetails}/>
      </main>
    </div>
  </div>
);

export default Main;
