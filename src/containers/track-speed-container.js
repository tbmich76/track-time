import React, { Component } from 'react'
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TrackSpeedChart from '../components/track-speed-chart';

class TrackSpeedContainer extends Component {

  render() {
    const { position, lapData } = this.props;
    return (
        <TrackSpeedChart lapData={lapData} />
    )
  }
}

TrackSpeedContainer.propTypes = {
  position: PropTypes.object.isRequired,
  lapData: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    position: state.position || {lat: 0, lng: 0},
    lapData: state.session ? state.session.item.geoData.laps[0] : {}
  };
}

export default connect(mapStateToProps)(TrackSpeedContainer)
