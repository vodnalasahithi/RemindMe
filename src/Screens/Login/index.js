import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Button,
  Text,
} from 'react-native';

import Card from '../../Components/Card';
import Input from '../../Components/Input';
import { Colors } from '../../Constants/Colors';
import styles from './styles';
import LoginContainer from './LoginContainer';
import Messages, { Sizes } from '../../Constants/Messages';

const Login = () => {
  return (
    <LoginContainer
      render={(isSignup, inputChangeHandler, isLoading, authHandler, setIsSignup) => (
        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={30} style={styles.screen}>
          <Card style={styles.authContainer}>
            <ScrollView>
              <Text style={styles.title}>{isSignup ? Messages.SIGN_UP : Messages.LOGIN}</Text>
              <Input
                id="email"
                label={Messages.EMAIL}
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText={Messages.EMAIL_VALIDATION}
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="password"
                label={Messages.PASSWORD}
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText={Messages.PASSWORD_VALIDATION}
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size={Sizes.SMALL} color={Colors.PRIMARY_COLOR} />
                ) : (
                  <Button
                    title={isSignup ? Messages.SIGN_UP : Messages.LOGIN}
                    color={Colors.PRIMARY_COLOR}
                    onPress={authHandler}
                  />
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={`Switch to ${isSignup ? Messages.LOGIN : Messages.SIGN_UP}`}
                  color={Colors.PRIMARY_COLOR}
                  onPress={() => {
                    setIsSignup((prevState) => !prevState);
                  }}
                />
              </View>
            </ScrollView>
          </Card>
        </KeyboardAvoidingView>
      )}
    />
  );
};

export default React.memo(Login);
