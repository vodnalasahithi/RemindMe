import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from '../Constants/Styles';

const ButtonComponent = ({
  onPress,
  title,
  icon,
  container,
  button,
  iconContainer,
  iconStyle,
  text,
}) => {
  return (
    <View style={Styles[container]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={Styles[button]}>
          <View style={Styles[iconContainer]}>
            <Icon style={Styles[iconStyle]} name={icon} />
          </View>
          <View style={Styles[iconContainer]}>
            <Text style={Styles[text]}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;
