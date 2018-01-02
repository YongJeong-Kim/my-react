export default function reducer(state={
    user: {},
    roles: [],
    avatar: {},
    loggedIn: false,
    fetching: false,
  }, action) {

    switch (action.type) {
      case "FETCH_USER": {
        return {...state, fetching: true}
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          user: action.payload,
        }
      }
      case "SET_USER_NAME": {
        return {
          ...state,
          user: {...state.user, name: action.payload},
        }
      }
      case "SET_USER_AGE": {
        return {
          ...state,
          user: {...state.user, age: action.payload},
        }
      }
      case "LOGGED_IN_USER": {
        return {...state, loggedIn: true,}
      }
      case "LOGIN_USER_INFO": {
        return {
          ...state,
          user: action.payload.user, roles: action.payload.roles,
          avatar: action.payload.avatar,
        }
      }
    }

    return state
}
