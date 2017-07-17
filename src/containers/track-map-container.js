import React, { Component } from 'react'
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TrackMap from '../components/track-map';
import { setTrackPosition } from '../actions';

const mapStateToProps = (state) => {
  return state.position || {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMapClick: (position) => {
      dispatch(setTrackPosition(position))
    }
  }
}

const TrackMapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackMap)

export default TrackMapContainer;
