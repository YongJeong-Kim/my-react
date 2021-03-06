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
        let user = action.payload.user
        user['tab'] = {
          tabs: [
            { title: 'main', value: 0, },
            { title: 'second', value: 1, },
          ],
          selected: 0,
        }
        return {
          ...state,
          user,
        }
      }
      case "SET_USER_PROFILE": {
        return {
          ...state,
          user: {
            ...state.user,
            avatarEncodeImage: action.payload.imagePreviewUrl,
          }
        }
      }
      case "SET_USER_CARD": {
        return {
          ...state,
          user: {
            ...state.user,
            encodeImage: action.payload.encodeImage,
            headline: action.payload.headline,
            notification: action.payload.notification,
          }
        }
      }
      case "SET_CONTENT_TAB": {
        return {
          ...state,
          user: {
            ...state.user,
            tab: action.payload,
          }
        }
      }
    }

    return state
}
