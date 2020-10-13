import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Colors} from '../Constants/Colors';
import Card from './Card';

const GetGoalDataIntoCard = ({
  daysLeft,
  goalDescription,
  goalId,
  cardContainer,
  touchableOpacity,
  text,
  navigationFunction,
}) => {
  return (
    <View style={styles.mainContainer} key={goalId}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={touchableOpacity}
        onPress={navigationFunction}>
        <Card style={cardContainer}>
          <View style={styles.cardInnerView}>
            <View style={styles.cardLeftView}>
              <Text style={text} ellipsizeMode="tail" numberOfLines={3}>
                {goalDescription}
              </Text>
              {daysLeft !== 0 ? (
                <Text style={text}>{`${daysLeft} days left`}</Text>
              ) : (
                <Text style={styles.italicText}>{'Kudos! You did it.'}</Text>
              )}
            </View>
            <View style={styles.cardRightView}>
              <Icon style={styles.iconStyle} name="running" />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

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
    justifyContent: 'flex-end',
  },
  missedView: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.WARNING,
    fontWeight: 'normal',
  },
  iconStyle: {
    color: Colors.PRIMARY_COLOR,
    right: 10,
    bottom: 40,
    fontSize: 25,
  },
  italicText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: Colors.TEXT,
    fontWeight: 'bold',
  },
});

export default GetGoalDataIntoCard;
