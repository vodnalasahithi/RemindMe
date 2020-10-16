import { useState, useEffect, useReducer, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';

import { signUp, login, userLoginStatus } from '../../redux/Login/loginAction';
import formReducer, { FORM_INPUT_UPDATE } from '../../Helpers/formReducer';
import Messages from '../../Constants/Messages';

const LoginContainer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert(Messages.AN_ERROR_OCCURRED, error, [{ text: Messages.OK }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = signUp(formState.inputValues.email, formState.inputValues.password);
    } else {
      action = login(formState.inputValues.email, formState.inputValues.password);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      await dispatch(userLoginStatus());
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return props.render(isSignup, inputChangeHandler, isLoading, authHandler, setIsSignup);
};

export default LoginContainer;
