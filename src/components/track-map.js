import React from "react";
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import jquery from 'jquery';

class TrackMap extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {session, onMapClick} = this.props;
    // var map = L.map('mapid', {
    //   center: [-38.505, 145.235],
    //   zoom: 15,
    //   preferCanvas: true,
    //   zoomControl: false,
    //   boxZoom: false,
    //   keyboard: false,
    //   doubleClickZoom: false,
    //   dragging: false,
    //   scrollWheelZoom: false,
    //   touchZoom: false
    // });

    // map.on('click', (e) => {
    //   onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    // });
    //
    // L.tileLayer('https://api.mapbox.com/styles/v1/timmicheletto/ciy8dz8tp000y2squkcmb9qil/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGltbWljaGVsZXR0byIsImEiOiJjaXk3c3VmaXUwMDcxMzJtcGozbzJwbGhiIn0.Z2czaTwwnxE66-_U6EKkrg').addTo(map);
    //
    // L.geoJSON(session.geoData, {
    //   // onEachFeature: (feature, layer) => {
    //   //   // if (feature.properties && feature.properties.description) {
    //   //   //   layer.bindTooltip(feature.properties.description);
    //   //   // }
    //   //   if (feature.properties && feature.properties.name) {
    //   //     layer.bindTooltip(feature.properties.name);
    //   //   }
    //   // }
    // }).addTo(map);

    mapboxgl.accessToken = 'pk.eyJ1IjoidGltbWljaGVsZXR0byIsImEiOiJjaXk3c3VmaXUwMDcxMzJtcGozbzJwbGhiIn0.Z2czaTwwnxE66-_U6EKkrg';
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/outdoors-v9",
      center: [145.238224, -38.505432],
      zoom: 15
    });

    map.on("load", function() {
      map.addSource("session", {
          "type": "geojson",
          "data": session.geoData
      });

      map.addLayer({
          "id": "laps",
          "type": "line",
          "source": "session",
          "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
          "paint": {
            "line-color": "#0000FF",
            "line-width": 1
          },
          "filter": ["==", "$type", "LineString"]
      });
    });
  }
  render() {
    return (
      <div id="map"></div>
    );
  }
}

TrackMap.propTypes = {
  session: PropTypes.object.isRequired,
  onMapClick: PropTypes.func.isRequired
  // session: PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   date: PropTypes.string,
  //   track: PropTypes.string,
  //   bestTime: PropTypes.string,
  //   geoData: PropTypes.object.isRequired}.isRequired)
};

export default TrackMap;
