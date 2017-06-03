import React from "react";
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';

const SessionRow = ({session}) => (
  <tr>
    <td>
      <Link to={`/sessionDetails/${session.id}`}>{session.title}</Link>
    </td>
    <td>{session.date}</td>
    <td>{session.track}</td>
    <td>{session.bestTime}</td>
  </tr>
);

SessionRow.propTypes = {
  session: PropTypes.shape({title: PropTypes.string, date: PropTypes.string, track: PropTypes.string, bestTime: PropTypes.string})
};

export default SessionRow;
