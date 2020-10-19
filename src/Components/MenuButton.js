import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';

import { Colors } from '../Constants/Colors';

const MenuButton = (props) => {
  const { style, name, onPress } = props;
  return (
    <View style={style}>
      <Icon name={name} onPress={onPress} size={35} color={Colors.TEXT} />
    </View>
  );
};

export default MenuButton;

MenuButton.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.shape(PropTypes.any.isRequired),
  onPress: PropTypes.func.isRequired,
};

MenuButton.defaultProps = {
  style: undefined,
};
