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
