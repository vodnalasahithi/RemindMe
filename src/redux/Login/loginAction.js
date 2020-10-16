/* eslint-disable radix */
import AsyncStorage from '@react-native-community/async-storage';

import loginActionTypes from './loginType';
import APIs from '../../config';

let timer;

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

export const signUp = (email, password) => {
  const data = JSON.stringify({
    email,
    password,
    returnSecureToken: true,
  });
  return async (dispatch) => {
    const response = await fetch(APIs.signUp, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
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
    const response = await fetch(APIs.signIn, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
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

const saveDataToAsyncStorage = (token, userId, expirationDate, email) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
      email,
    })
  );
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: loginActionTypes.LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
