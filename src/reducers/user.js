export const userList = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      if (action.status === 'SUCCESS') {
        return action.data
      }
    case 'TEAM_ADD_USER':
      if (action.status === 'SUCCESS') {
        return null
      }
    default:
      return state
  }
}

export const currUserInfo = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USER_INFO':
      if (action.status === 'SUCCESS') {
        return action.data
      } else if (action.status === 'FAILURE') {
        return 'Logged out'
      }
      return 'Fetching'
    case 'SET_CURR_USER_INFO':
      return action.data
    default:
      return state
  }
}

export const currUserPermissions = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USER_PERMISSIONS':
      if (action.status === 'SUCCESS') {
        return action.data
      }
    case 'CREATE_TEAM':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        newState.teams.push(action.data)
        return newState
      }
    case 'TEAM_REMOVE_USER':
      if (action.status === 'SUCCESS' && state && action.data._id === state._id) {
        return 'Invalid'
      }
    case 'TEAM_JOIN_REQUEST':
      if (action.status === 'SUCCESS') {
        return 'Invalid'
      }

    default:
      return state
  }
}
