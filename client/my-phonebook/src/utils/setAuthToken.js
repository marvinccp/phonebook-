// import axios from "./http";

const setAuthToken = () => {
  const tokenUser = window.localStorage.getItem('token')
  return tokenUser
};

export default setAuthToken;
