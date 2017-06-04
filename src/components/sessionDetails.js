import React from "react";
import PropTypes from 'prop-types';
import TrackMap from "./track-map";

const SessionDetails = ({session}) => (
  <div>
    <h1>{session.title}</h1>
    <TrackMap session={session}/>
  </div>
);

SessionDetails.propTypes = {
  session: PropTypes.object.isRequired

  // session: PropTypes.shape({
  //   title: PropTypes.string.required,
  //   date: PropTypes.string,
  //   track: PropTypes.string,
  //   bestTime: PropTypes.string,
  //   geoData: PropTypes.object.required}.required)
};

export default SessionDetails;
