import React from "react";
import tj from "togeojson";
import parser from 'xml2js-parser';
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import _ from 'lodash';
import {SessionsService} from "../services/sessions-service";

import "react-datepicker/dist/react-datepicker.css";

const transformPoints = (data) => {
  const points = [];
  for (let i = 0; i < data.when.length; i++) {
    let timestamp = data.when[i];
    const parts = timestamp.split('-');
    if (parts[0].length > 4) {
      timestamp = timestamp.slice(2, timestamp.length);
    }

    const coords = data["gx:coord"][i].split(' ');

    // console.log(data);
    points.push({
      acceleration: parseFloat(data.ExtendedData[0].SchemaData[0]["gx:SimpleArrayData"][1]["gx:value"][i]),
      leanAngle: parseInt(data.ExtendedData[0].SchemaData[0]["gx:SimpleArrayData"][0]["gx:value"][i]),
      speed: parseFloat(data.ExtendedData[0].SchemaData[0]["gx:SimpleArrayData"][2]["gx:value"][i]),
      coordinates: { longitude: coords[0], latitude: coords[1] },
      timestamp: moment.tz(timestamp, 'Australia/Sydney')
    });
  }
  return points;
}

const transformSessionData = (data) => {
  const doc = data.kml.Document[0];
  const res = {
    title: doc.Folder[0].name[0],
    laps: doc.Folder[0].Folder.map((f) => {
      return {
        id: f.Folder[0].Placemark[0].name[0],
        title: f.name[0],
        location: { latitude: f.Folder[0].Placemark[0]["gx:Track"][0].Model[0].Location[0].latitude[0], longitude: f.Folder[0].Placemark[0]["gx:Track"][0].Model[0].Location[0].longitude[0] },
        points: transformPoints(f.Folder[0].Placemark[0]["gx:Track"][0])
      }
    })
  }
  _.each(res.laps, (lap) => {
    lap.duration = (_.last(lap.points).timestamp.diff(_.first(lap.points).timestamp)) / 1000;
  });
  return res;
}

class SessionUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
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
      const res = parser.parseStringSync(contents);
      const data = transformSessionData(res);
      this.setState({geoData: data});
    }.bind(this);
    reader.readAsText(file);
  }
  handleDateSelected(date) {
    this.setState({date: date});
  }
  handleCancel(e) {
    this.props.history.push('/');
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
      this.props.history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
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
    );
  }
}

export default SessionUpload
