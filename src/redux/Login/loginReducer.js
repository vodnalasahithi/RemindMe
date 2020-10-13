import loginActionTypes from './loginType';

const initialState = {
  isUserLoggedIn: false,
  token: null,
  userId: null,
  email: '',
};

export default function (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case loginActionTypes.GET_USER_LOGGING_STATUS:
      return {
        ...state,
        isUserLoggedIn: true,
      };
    case loginActionTypes.AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        email: action.email,
        isUserLoggedIn: true,
      };
    case loginActionTypes.LOGOUT:
      return {
        ...initialState,
        isUserLoggedIn: true,
      };
    default:
      return state;
  }
}
