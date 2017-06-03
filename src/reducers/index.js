import {
  REQUEST_SESSION_SUMMARIES, RECEIVE_SESSION_SUMMARIES
} from '../actions'

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

const rootReducer = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_SUMMARIES:
    case REQUEST_SESSION_SUMMARIES:
      return {
        sessionSummaries: sessionSummaries(state.sessionSummaries, action)
      }
    default:
      return state
  }
}

export default rootReducer
