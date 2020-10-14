import React from 'react';
import { View } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import GoalDetailsContainer from './GoalDetailsContainer';
import styles from './styles';
import Card from '../../Components/Card';
import TextComponent from '../../Components/TextComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import { Colors } from '../../Constants/Colors';

const GoalDetails = ({ route, navigation }) => {
  return (
    <GoalDetailsContainer
      route={route}
      navigation={navigation}
      render={(goalDetails, onConfirmGoalComplete, onRestartGoal) => (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.mainContainer}>
              <Card style={styles.cardContainer}>
                <TextComponent style={styles.textContainer} text={goalDetails.goalDescription} />
                <View style={styles.innerContainer}>
                  <Icon style={styles.iconStyle} name="clock" />
                  <TextComponent style={styles.textStyle} text={goalDetails.goalTime} />
                </View>
                <TextComponent style={styles.textStyle} text="Progress : " />
                <View style={styles.progressBar}>
                  <ProgressBar
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={goalDetails.progress}
                    color={Colors.PRIMARY_COLOR}
                  />
                </View>
                <View style={styles.viewContainer}>
                  <TextComponent
                    style={styles.daysLeftTextStyle}
                    text={`${goalDetails.daysLeft} days left`}
                  />
                </View>
              </Card>
              <ButtonComponent
                title="Mark as complete"
                onPress={onConfirmGoalComplete}
                icon="check"
                container="submitContainer"
                button="markAsCompleteButton"
                iconContainer="submitIconContainer"
                iconStyle="submitIconStyle"
                text="submitText"
              />
              <ButtonComponent
                title="Missed it! Start again"
                onPress={onRestartGoal}
                container="missedButtonSubmitContainer"
                button="missedButton"
                iconContainer="submitIconContainer"
                text="missedButtonText"
              />
            </View>
          </ScrollView>
        </View>
      )}
    />
  );
};

export default GoalDetails;
