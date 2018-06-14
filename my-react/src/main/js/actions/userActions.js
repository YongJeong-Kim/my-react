import axios from "axios";

export function fetchUser() {
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
      name: "Will",
      age: 35,
    }
  }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  }
}

export function setUserAge(age) {
  return {
    type: 'SET_USER_AGE',
    payload: age,
  }
}

export function getLoginUserInfo() {
  return function(dispatch) {
    dispatch({type: "FETCH_USER"});

    axios.get("/login/user/info")
      .then((response) => {
        dispatch({type: "LOGIN_USER_INFO", payload: response.data});
      })
      .catch((err) => {
        console.log('error');
      })
  }
}

export const setUserProfile = (profile) => {
  let profileDTO = {
    ...profile,
    file: {
      lastModified: profile.file.lastModified,
      lastModifiedDate : profile.file.lastModifiedDate,
      name: profile.file.name,
      size: profile.file.size,
      type: profile.file.type,
      webkitRelativePath: profile.file.webkitRelativePath,
    },
  }

  let headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  }
  return (dispatch) => {
    axios.post("/user/set/profile", profileDTO, headers)
      .then((response) => {
        dispatch({type: "SET_USER_PROFILE", payload: profileDTO});
      }).catch((err) => {
        console.log('err');
      })
  }
}

export let setUserCard = (edit) => {
  let headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  }
  return (dispatch) => {
    axios.post("/user/set/card", edit, headers)
      .then((response) => {
          dispatch({ type: "SET_USER_CARD", payload: edit })
      }).catch((err) => {
        console.log('err card');
      })
  }
}

export const setContentTab = (tab) => {
  return (dispatch) => {
    dispatch({ type: "SET_CONTENT_TAB", payload: tab, })
  }
}
