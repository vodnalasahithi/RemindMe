import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
  },
});
const Card = (props) => {
  const { style, children } = props;
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

export default Card;

Card.propTypes = {
  style: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
