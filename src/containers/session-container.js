import React, { Component } from 'react'
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSessionIfNeeded } from '../actions'
import SessionDetails from '../components/sessionDetails';

class SessionContainer extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch(fetchSessionIfNeeded(match.params.sessionId))
  }

  render() {
    const { session, isFetching } = this.props
    return (
        <div>
          {isFetching && !session.geoData &&
            <h2>Loading...</h2>
          }
          {session.geoData &&
            <SessionDetails session={session} />
          }
        </div>
    )
  }
}

SessionContainer.propTypes = {
  session: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const s = state.session;
  const {
    isFetching,
    item: session
  } = s || {
    isFetching: true,
    item: {}
  };

  return {
    session,
    isFetching
  }
}

export default connect(mapStateToProps)(SessionContainer)
