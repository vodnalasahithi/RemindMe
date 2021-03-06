import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../Constants/Colors';

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    width: 70,
    height: 70,
    backgroundColor: Colors.PRIMARY_COLOR,
    borderRadius: 100,
    fontSize: 50,
    fontWeight: 'normal',
    color: Colors.TEXT,
    textAlign: 'center',
  },

  FloatingButton: {
    width: 70,
    height: 70,
    backgroundColor: Colors.TEXT,
    borderRadius: 100,
    fontSize: 50,
    fontWeight: 'normal',
    color: Colors.PRIMARY_COLOR,
    textAlign: 'center',
  },
});

const AddButton = ({ navigation, routeName, styleType }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate(routeName, { type: false })}
      style={styles.TouchableOpacityStyle}>
      <Text style={styleType ? styles.FloatingButtonStyle : styles.FloatingButton}>+</Text>
    </TouchableOpacity>
  );
};

export default AddButton;

AddButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  routeName: PropTypes.string.isRequired,
  styleType: PropTypes.bool.isRequired,
};
