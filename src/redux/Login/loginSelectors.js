const getLoginSelector = (state) => {
  return state.login;
};

export const getUserLoginStatus = (state) => {
  return getLoginSelector(state).isUserLoggedIn;
};

export const getUserLoginEmail = (state) => {
  return getLoginSelector(state).email;
};

export const getUserLoginToken = (state) => {
  return getLoginSelector(state).token;
};
