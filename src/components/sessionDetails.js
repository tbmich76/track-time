import React from "react";
import {SessionsService} from "../services/sessions-service";
import L from 'leaflet';

export class SessionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {}
    };
    this.sessionsService = new SessionsService();
  }
  componentDidMount() {
    this.sessionsService.getSession(this.props.params.sessionId).then(function(data) {
      this.setState({session: data});
      const features = data.geoData.features.filter((f) => {
        return f.geometry.type === 'LineString';
      });
      var map = L.map('mapid', {
        center: [-38.505, 145.235],
        zoom: 15
      });

      L.tileLayer('https://api.mapbox.com/styles/v1/timmicheletto/ciy8dz8tp000y2squkcmb9qil/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGltbWljaGVsZXR0byIsImEiOiJjaXk3c3VmaXUwMDcxMzJtcGozbzJwbGhiIn0.Z2czaTwwnxE66-_U6EKkrg').addTo(map);

      L.geoJSON(features).addTo(map);
    }.bind(this));
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div id="mapid"></div>
        </div>
      </div>
    );
  }
}
