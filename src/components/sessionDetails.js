import React from "react";
import PropTypes from 'prop-types';
import TrackMapContainer from "../containers/track-map-container";
import TrackSpeedContainer from "../containers/track-speed-container";
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';

const SessionDetails = ({session}) => {
  const options = session.geoData.laps.map((l) => {
    return l.id;
  });
  return (
    <div>
      <h1>{session.title}</h1>
      <Dropdown options={options} value={options[0]} placeholder="Select an option" />
      <TrackSpeedContainer session={session}/>
      { /* <TrackMapContainer session={session}/> */ }
    </div>
  );
}

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
