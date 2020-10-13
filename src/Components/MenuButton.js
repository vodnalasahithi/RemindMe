import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import {Colors} from '../Constants/Colors';

const MenuButton = (props) => {
  return (
    <View style={props.style}>
      <Icon
        name={props.name}
        onPress={props.onPress}
        size={35}
        color={Colors.TEXT}
      />
    </View>
  );
};

export default MenuButton;
