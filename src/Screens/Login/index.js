import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert,
  Text,
} from 'react-native';
import {useDispatch} from 'react-redux';

import Card from '../../Components/Card';
import Input from '../../Components/Input';
import {Colors} from '../../Constants/Colors';
import {signUp, login, userLoginStatus} from '../../redux/Login/loginAction';
import formReducer, {FORM_INPUT_UPDATE} from '../../Helpers/formReducer';
import styles from './styles';
const Login = () => {
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
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = signUp(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    } else {
      action = login(
        formState.inputValues.email,
        formState.inputValues.password,
      );
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
    [dispatchFormState],
  );

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={30}
      style={styles.screen}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Text style={styles.title}>{isSignup ? 'Sign Up' : 'Login'}</Text>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={isSignup ? 'Sign Up' : 'Login'}
                color={Colors.PRIMARY_COLOR}
                onPress={authHandler}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
              color={Colors.PRIMARY_COLOR}
              onPress={() => {
                setIsSignup((prevState) => !prevState);
              }}
            />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default React.memo(Login);
