'use strict';

var React = require('react');

var SessionTable = require('./sessionTable.js');

var sessions = [
  {id: 1, title: 'Broadford S1', track: 'Broadford', date: '10/04/2016', bestTime: '1:05.7'},
  {id: 2,  title: 'Broadford S2', track: 'Broadford', date: '10/04/2016', bestTime: '1:04.7'},
  {id: 3, title: 'Broadford S3', track: 'Broadford', date: '10/04/2016', bestTime: '1:03.2'},
  {id: 4, title: 'Broadford S4', track: 'Broadford', date: '10/04/2016', bestTime: '1:03.7'},
  {id: 5, title: 'Broadford S5', track: 'Broadford', date: '10/04/2016', bestTime: '1:04.1'},
  {id: 6, title: 'Broadford S6', track: 'Broadford', date: '10/04/2016', bestTime: '1:03.9'}
];

var Home = React.createClass({
	render: function(){
		return (
			<div class="starter-template">
        		<h1>Bootstrap starter template</h1>
        		<p class="lead">Use this document as a way to quickly start any new project.<br /> All you get is this text and a mostly barebones HTML document.</p>
				<div className="row">
					<div className="col-md-10">
						<SessionTable sessions={sessions} />
					</div>
				</div>
			</div>);
	}
});

module.exports = Home;