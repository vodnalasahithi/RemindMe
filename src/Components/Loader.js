import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../Constants/Colors';

const Loader = ({ size }) => {
  return <ActivityIndicator size={size} color={Colors.PRIMARY_COLOR} />;
};

export default Loader;

Loader.propTypes = {
  size: PropTypes.string.isRequired,
};
