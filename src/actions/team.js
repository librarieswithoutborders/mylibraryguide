import {dbPath, setUpdateStatus, setRequestStatus, hideAdminModal} from './index'

export function createTeam(teamInfo) {
  return dispatch => {
    dispatch(setUpdateStatus({type: 'CREATE_TEAM', status: 'INITIATED'}))

    return fetch(
      `${dbPath}/team`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamInfo)
      })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(setUpdateStatus({type: 'CREATE_TEAM', status: 'FAILED'}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type: 'CREATE_TEAM', status: 'SUCCESS', data: json}))
        }
      })
  }
}

export function updateTeam(teamInfo) {
  return dispatch => {
    dispatch(setUpdateStatus({type: 'UPDATE_TEAM', status: 'INITIATED'}))

    return fetch(
      `${dbPath}/team`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamInfo)
      })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(setUpdateStatus({type: 'UPDATE_TEAM', message: json.error.message, status: 'FAILED'}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type: 'UPDATE_TEAM', status: 'SUCCESS', data: teamInfo.data}))
        }
      })
  }
}

export function deleteTeam(teamInfo) {
  return dispatch => {
    dispatch(setUpdateStatus({type: 'DELETE_TEAM', status: 'INITIATED'}))
    return fetch(
      `${dbPath}/team/?_id=${teamInfo._id}`,
      {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(json => {
        dispatch(setUpdateStatus({type: 'DELETE_TEAM', status: 'SUCCESS', data: teamInfo}))
      })
  }
}

export function fetchTeam(path) {
  return dispatch => {
    dispatch(setRequestStatus({type: 'FETCH_TEAM', status: 'INITIATED'}))

    return fetch(
      `${dbPath}/team/?path=${path}`,
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        if (json) {
          dispatch(setRequestStatus({type: 'FETCH_TEAM', status: 'SUCCESS', data: json}))
        } else {
          dispatch(setRequestStatus({type: 'FETCH_TEAM', status: 'FAILURE'}))
        }
      })
  }
}

export function fetchTeamList() {
  return dispatch => {
    dispatch(setRequestStatus({type: 'FETCH_TEAMS', status: 'INITIATED'}))

    return fetch(
      `${dbPath}/teams`,
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        dispatch(setRequestStatus({type: 'FETCH_TEAMS', status: 'SUCCESS', data: json}))
      })
  }
}

export function teamApproveUserRequest(user, team) {
  return dispatch => {
    dispatch(setUpdateStatus({type: 'TEAM_APPROVE_USER_REQUEST', status: 'INITIATED'}))

    return fetch(
      `${dbPath}/team_approve_user_request`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: user._id, teamId: team._id})
      })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(setUpdateStatus({type: 'TEAM_APPROVE_USER_REQUEST', message: json.error.message, status: 'FAILED'}))
        } else {
          dispatch(setUpdateStatus({type: 'TEAM_APPROVE_USER_REQUEST', status: 'SUCCESS', data: user}))
        }
      })
  }
}

export function teamDenyUserRequest(user, team) {
  return dispatch => {
    dispatch(setUpdateStatus({type: 'TEAM_DENY_USER_REQUEST', status: 'INITIATED'}))

    return fetch(
      `${dbPath}/team_deny_user_request`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: user._id, teamId: team._id})
      })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(setUpdateStatus({type: 'TEAM_DENY_USER_REQUEST', message: json.error.message, status: 'FAILED'}))
        } else {
          dispatch(setUpdateStatus({type: 'TEAM_DENY_USER_REQUEST', status: 'SUCCESS', data: user}))
        }
      })
  }
}

export function resetCurrTeam() {
  return {
    type: 'RESET_CURR_TEAM'
  }
}
