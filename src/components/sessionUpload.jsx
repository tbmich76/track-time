import React from "react";
import tj from "togeojson";
import DatePicker from "react-datepicker";
import moment from "moment";
import {SessionsService} from "../services/sessions-service";
import {browserHistory} from 'react-router';

import "react-datepicker/dist/react-datepicker.css";

export class SessionUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      track: "broadford",
      date: moment(),
      geoData: {}
    };
    this.sessionsService = new SessionsService();
  }
  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }
  handleTrackSelected(e) {
    this.setState({track: e.target.value});
  }
  handleFileSelected(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      const contents = e.target.result;
      const parser = new DOMParser();
      const xmlDom = parser.parseFromString(contents, "text/xml");
      if (file.name.endsWith(".kml")) {
        this.setState({geoData: tj.kml(xmlDom)});
      } else if (file.name.endsWith(".gpx")) {
        this.setState({geoData: tj.gpx(xmlDom)});
      }
    }.bind(this);
    reader.readAsText(file);
  }
  handleDateSelected(date) {
    this.setState({date: date});
  }
  handleCancel(e) {
    browserHistory.goBack();
  }
  handleSubmit(e) {
    e.preventDefault();

    let session = {
      title: this.state.title,
      track: this.state.track,
      geoData: this.state.geoData,
      date: this.state.date.toDate()
    };
    this.sessionsService.createSession(session).then((result) => {
      browserHistory.push('/');
    }).catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input id="title" className="form-control" type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)} required></input>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <DatePicker id="date" className="form-control" selected={this.state.date} onChange={this.handleDateSelected.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="track">Track</label>
              <select id="track" className="form-control" value={this.state.track} onChange={this.handleTrackSelected.bind(this)} required>
                <option value="broadford">Broadford</option>
                <option value="phillip island">Phillip Island</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="file">KML or GPX export</label>
              <input id="file" accept=".kml,.gpx" multiple={false} type="file" onChange={this.handleFileSelected.bind(this)} required></input>
            </div>
          </form>
          <div className="footer">
            <button type="button" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Upload</button>
          </div>
        </div>
      </div>
    );
  }
}
