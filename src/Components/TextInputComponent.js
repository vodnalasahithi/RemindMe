import React from 'react';
import { TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Colors } from '../Constants/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingBottom: 0,
  },
  input: {
    backgroundColor: Colors.TEXT,
    borderRadius: 5,
    shadowColor: Colors.PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: Colors.PRIMARY_COLOR,
    fontSize: 20,
  },
});
const TextInputComponent = ({ onChangeText, value }) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder="Write..."
        numberOfLines={4}
        autoCorrect
        multiline
        maxLength={100}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.PRIMARY_COLOR}
      />
    </KeyboardAvoidingView>
  );
};

export default TextInputComponent;
