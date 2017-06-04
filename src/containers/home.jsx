import React, { Component } from 'react'
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSessionSummariesIfNeeded } from '../actions'
import SessionTable from '../components/sessionTable';

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchSessionSummariesIfNeeded())
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(fetchSessionSummariesIfNeeded())
  }

  render() {
    const { sessionSummaries, isFetching } = this.props
    return (
        <div>
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
          {isFetching && sessionSummaries.length === 0 &&
            <h2>Loading...</h2>
          }
          {sessionSummaries.length > 0 &&
            <div className="col-md-12">
              <Link to="/sessionUpload">Upload a session</Link>
              <SessionTable sessionSummaries={sessionSummaries}/>
            </div>
          }
        </div>
    )
  }
}

Home.propTypes = {
  sessionSummaries: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const s = state.sessionSummaries;
  const {
    isFetching,
    items: sessionSummaries
  } = s || {
    isFetching: true,
    items: []
  };

  return {
    sessionSummaries,
    isFetching
  }
}

export default connect(mapStateToProps)(Home)
