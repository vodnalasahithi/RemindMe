import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const TextComponent = (props) => {
  const { style, text } = props;
  return <Text style={{ ...style }}>{text}</Text>;
};

export default TextComponent;

TextComponent.propTypes = {
  text: PropTypes.string,
  style: PropTypes.shape(PropTypes.any.isRequired),
};

TextComponent.defaultProps = {
  style: undefined,
};
