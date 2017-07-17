import {
  REQUEST_SESSION_SUMMARIES,
  RECEIVE_SESSION_SUMMARIES,
  RECEIVE_SESSION,
  REQUEST_SESSION,
  SET_TRACK_POSITION
} from '../actions'


function session(state = {
  isFetching: false,
  item: {}
}, action) {
  switch (action.type) {
    case REQUEST_SESSION:
      return {
        isFetching: true,
        item: {}
      }
    case RECEIVE_SESSION:
      return {
        isFetching: false,
        item: action.session
      }
    default:
      return state
  }
}

function sessionSummaries(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_SESSION_SUMMARIES:
      return {
        isFetching: true,
        items: []
      }
    case RECEIVE_SESSION_SUMMARIES:
      return {
        isFetching: false,
        items: action.sessionSummaries
      }
    default:
      return state
  }
}

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_SUMMARIES:
    case REQUEST_SESSION_SUMMARIES:
      return {
        sessionSummaries: sessionSummaries(state.sessionSummaries, action)
      }
    case RECEIVE_SESSION:
    case REQUEST_SESSION:
      return {
        session: session(state.session, action)
      }
    case SET_TRACK_POSITION:
      return Object.assign({}, state, {
        position: action.position || {lat: 0, lng: 0}
      });
    default:
      return state
  }
}

export default rootReducer
