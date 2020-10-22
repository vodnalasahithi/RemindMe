/* eslint-disable radix */
import AsyncStorage from '@react-native-community/async-storage';
import apiServiceWrapper from '../../apiServiceWrapper';

import loginActionTypes from './loginType';
import APIs, { Method } from '../../config';
import Messages from '../../Constants/Messages';

let timer;

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem(Messages.USER_DATA);
  return { type: loginActionTypes.LOGOUT };
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const authenticateAction = (userId, token, expiryTime, email) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: loginActionTypes.AUTHENTICATE,
      userId,
      token,
      email,
    });
  };
};

const saveDataToAsyncStorage = (token, userId, expirationDate, email) => {
  AsyncStorage.setItem(
    Messages.USER_DATA,
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
      email,
    })
  );
};
export const signUp = (email, password) => {
  const data = JSON.stringify({
    email,
    password,
    returnSecureToken: true,
  });
  return async (dispatch) => {
    const response = await apiServiceWrapper(APIs.signUp, Method.POST, data);

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = Messages.SOMETHING_WENT_WRONG;
      if (errorId === Messages.EMAIL_EXISTS) {
        message = Messages.EMAIL_ALREADY_EXISTS;
      }
      throw new Error(message);
    }

    const resData = await response.json();
    const expirationDateFormat = parseInt(resData.expiresIn) * 1000;
    dispatch(authenticateAction(resData.localId, resData.idToken, expirationDateFormat));
    const expirationDate = new Date(new Date().getTime() + expirationDateFormat);
    saveDataToAsyncStorage(resData.idToken, resData.localId, expirationDate, resData.email);
  };
};

export const login = (email, password) => {
  const data = JSON.stringify({
    email,
    password,
    returnSecureToken: true,
  });
  return async (dispatch) => {
    const response = await apiServiceWrapper(APIs.signIn, Method.POST, data);

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = Messages.SOMETHING_WENT_WRONG;
      if (errorId === Messages.EMAIL_NOT_FOUND) {
        message = Messages.THIS_EMAIL_COULD_NOT_BE_FOUND;
      } else if (errorId === Messages.INVALID_PASSWORD) {
        message = Messages.THIS_PASSWORD_IS_NOT_VALID;
      }
      throw new Error(message);
    }

    const resData = await response.json();
    const expirationDateFormat = parseInt(resData.expiresIn) * 1000;
    dispatch(authenticateAction(resData.localId, resData.idToken, expirationDateFormat));
    const expirationDate = new Date(new Date().getTime() + expirationDateFormat);
    saveDataToAsyncStorage(resData.idToken, resData.localId, expirationDate, resData.email);
  };
};

export const userLoginStatus = () => {
  return async (dispatch) => {
    dispatch({ type: loginActionTypes.GET_USER_LOGGING_STATUS });
  };
};
