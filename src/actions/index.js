import {SessionsService} from '../services/sessions-service'

// export const REQUEST_SESSION = 'REQUEST_SESSION'
// export const RECEIVE_SESSION = 'RECEIVE_SESSION'
// export const SELECT_SESSION = 'SELECT_SESSION'

export const REQUEST_SESSION_SUMMARIES = 'REQUEST_SESSION_SUMMARIES'
export const RECEIVE_SESSION_SUMMARIES = 'RECEIVE_SESSION_SUMMARIES'

const sessionsService = new SessionsService();

// export function selectSession(sessionId) {
//   return {
//     type: SELECT_SESSION,
//     sessionId
//   }
// }

// function requestSession(sessionId) {
//   return {
//     type: REQUEST_SESSION,
//     sessionId
//   }
// }

// function receiveSession(sessionId, data) {
//   return {
//     type: RECEIVE_SESSION,
//     sessionId,
//     session: data,
//     receivedAt: Date.now()
//   }
// }

// function fetchSession(sessionId) {
//   return dispatch => {
//     dispatch(requestSession(sessionId))
//     return sessionsService.getSession(sessionId)
//       .then(data => dispatch(receiveSession(sessionId, data)));
//   }
// }

// function shouldFetchSession(state, sessionId) {
//   const session = state.sessions[sessionId]
//   if (!session) {
//     return true
//   } else if (session.isFetching) {
//     return false
//   } else {
//     return true;
//   }
// }

// export function fetchSessionIfNeeded(sessionId) {
//   return (dispatch, getState) => {
//     if (shouldFetchSession(getState(), sessionId)) {
//       return dispatch(fetchSession(sessionId))
//     }
//   }
// }

// export const setTrackPosition = (position) => {
//   return {
//     type: 'SET_TRACK_POSITION',
//     position
//   }
// }

function requestSessionSummaries() {
  return {
    type: REQUEST_SESSION_SUMMARIES
  }
}

function receiveSessionSummaries(data) {
  return {
    type: RECEIVE_SESSION_SUMMARIES,
    sessionSummaries: data,
    receivedAt: Date.now()
  }
}

function fetchSessionSummaries() {
  return dispatch => {
    dispatch(requestSessionSummaries())
    return sessionsService.getSessions()
      .then((data) => dispatch(receiveSessionSummaries(data)));
  }
}

function shouldFetchSessionSummaries(state) {
  const sessionSummaries = state.sessionSummaries
  if (!sessionSummaries) {
    return true
  } else if (sessionSummaries.isFetching) {
    return false
  } else {
    return true;
  }
}

export const fetchSessionSummariesIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchSessionSummaries(getState())) {
      return dispatch(fetchSessionSummaries())
    }
  }
}
