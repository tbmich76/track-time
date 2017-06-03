import React from 'react';
import PropTypes from 'prop-types';
import SessionRow from "./sessionRow";

const SessionTable = ({sessionSummaries}) => (
  <div className="row">
    <div className="col-md-8 col-md-offset-2">
      <table className="table">
        <thead>
          <tr>
            <th>Session</th>
            <th>Date</th>
            <th>Track</th>
            <th>Best Time</th>
          </tr>
        </thead>
        <tbody>{sessionSummaries.map(session => <SessionRow session={session} key={session.id}/>)}</tbody>
      </table>
    </div>
  </div>
);

SessionTable.propTypes = {
  sessionSummaries: PropTypes.array.isRequired
};

export default SessionTable;
