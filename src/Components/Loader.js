import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {Colors} from '../Constants/Colors';

const Loader = ({size}) => {
  return <ActivityIndicator size={size} color={Colors.PRIMARY_COLOR} />;
};

export default Loader;
