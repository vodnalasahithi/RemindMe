import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '../Constants/Colors';
import Card from './Card';
import Messages, { Status } from '../Constants/Messages';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  cardInnerView: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardLeftView: {
    justifyContent: 'flex-start',
  },
  cardRightView: {
    left: 10,
    flex: 1,
    justifyContent: 'flex-start',
  },
  missedView: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.WARNING,
    fontWeight: 'normal',
  },
});
const GetReminderDataIntoCard = ({
  time,
  date,
  description,
  status,
  id,
  cardContainer,
  touchableOpacity,
  text,
  navigationFunction,
}) => {
  return (
    <View style={styles.mainContainer} key={id}>
      <TouchableOpacity activeOpacity={0.8} style={touchableOpacity} onPress={navigationFunction}>
        <Card style={cardContainer}>
          <View style={styles.cardInnerView}>
            <View style={styles.cardLeftView}>
              {date !== new Date().toDateString() ? (
                <Text style={text}>{date}</Text>
              ) : (
                <Text style={text}>{Messages.TODAY}</Text>
              )}
              <Text style={text}>{time}</Text>
              {status === Status.MISSED && (
                <Text style={styles.missedView}>{Messages.MISSED_WARNING}</Text>
              )}
            </View>
            <View style={styles.cardRightView}>
              <Text style={text} ellipsizeMode="tail" numberOfLines={3}>
                {description}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default GetReminderDataIntoCard;
