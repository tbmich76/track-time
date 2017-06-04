import React from "react";
import PropTypes from 'prop-types';
import L from 'leaflet';
import jquery from 'jquery';

class TrackMap extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.session);
  }
  componentDidMount() {
    var map = L.map('mapid', {
      center: [-38.505, 145.235],
      zoom: 15,
      preferCanvas: true,
      zoomControl: false,
      boxZoom: false,
      keyboard: false,
      doubleClickZoom: false,
      dragging: false,
      scrollWheelZoom: false,
      touchZoom: false
    });

    map.on('click', (e) => {
      console.log(e.latlng);
    });

    L.tileLayer('https://api.mapbox.com/styles/v1/timmicheletto/ciy8dz8tp000y2squkcmb9qil/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGltbWljaGVsZXR0byIsImEiOiJjaXk3c3VmaXUwMDcxMzJtcGozbzJwbGhiIn0.Z2czaTwwnxE66-_U6EKkrg').addTo(map);

    L.geoJSON(this.props.session.geoData, {
      onEachFeature: (feature, layer) => {
        // if (feature.properties && feature.properties.description) {
        //   layer.bindTooltip(feature.properties.description);
        // }
        if (feature.properties && feature.properties.name) {
          layer.bindTooltip(feature.properties.name);
        }
      }
    }).addTo(map);
  }
  render() {
    return (
      <div id = "mapid"></div>
    );
  }
}

TrackMap.propTypes = {
  session: PropTypes.object.isRequired
  // session: PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   date: PropTypes.string,
  //   track: PropTypes.string,
  //   bestTime: PropTypes.string,
  //   geoData: PropTypes.object.isRequired}.isRequired)
};

export default TrackMap;
