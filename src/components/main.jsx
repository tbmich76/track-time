import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/home';
import SessionUpload from './sessionUpload';
import SessionDetails from './sessionDetails';

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path="sessionUpload" component={SessionUpload}/>
      <Route path="sessionDetails/:sessionId" component={SessionDetails}/>
    </Switch>
  </main>
);

export default Main;
