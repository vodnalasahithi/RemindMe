import React from 'react';
import {Text} from 'react-native';

const TextComponent = (props) => {
  return <Text style={{...props.style}}>{props.text}</Text>;
};

export default TextComponent;
