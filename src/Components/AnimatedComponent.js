import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';

import { Colors } from '../Constants/Colors';
import { Icons } from '../Constants/Messages';

const styles = StyleSheet.create({
  fadingContainer: {
    backgroundColor: Colors.WARNING_ACCENT,
    height: 60,
    marginVertical: 150,
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingText: {
    color: Colors.TEXT,
    fontWeight: '600',
    fontSize: 22,
  },
});

const AnimatedComponent = ({ message }) => {
  // FadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 5,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  }, [fadeAnim, message]);

  return (
    <View>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim, // Bind opacity to animated value
          },
        ]}>
        <Icon name={Icons.EXCLAMATIONCIRCLEO} size={25} color={Colors.TEXT} />
        <Text style={styles.fadingText}> {message}</Text>
      </Animated.View>
    </View>
  );
};

export default AnimatedComponent;

AnimatedComponent.propTypes = {
  message: PropTypes.string.isRequired,
};
