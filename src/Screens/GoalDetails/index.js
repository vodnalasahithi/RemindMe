import React from 'react';
import { View } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import GoalDetailsContainer from './GoalDetailsContainer';
import styles from './styles';
import Card from '../../Components/Card';
import TextComponent from '../../Components/TextComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import { Colors } from '../../Constants/Colors';
import Messages, { Icons, Status } from '../../Constants/Messages';

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
                  <Icon style={styles.iconStyle} name={Icons.CLOCK} />
                  <TextComponent style={styles.textStyle} text={goalDetails.goalTime} />
                </View>
                <TextComponent style={styles.textStyle} text={Messages.PROGRESS_VALUE} />
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
                    text={`${goalDetails.daysLeft}${Messages.DAYS_LEFT}`}
                  />
                </View>
              </Card>
              {goalDetails.status === Status.COMPLETED ? null : (
                <ButtonComponent
                  title={Messages.MARK_AS_COMPLETE}
                  onPress={onConfirmGoalComplete}
                  icon={Icons.CHECK}
                  container="submitContainer"
                  button="markAsCompleteButton"
                  iconContainer="submitIconContainer"
                  iconStyle="submitIconStyle"
                  text="submitText"
                />
              )}

              <ButtonComponent
                title={Messages.MISSED_IT_START_AGAIN}
                onPress={onRestartGoal}
                container={
                  goalDetails.status !== Status.COMPLETED
                    ? 'missedButtonSubmitContainer'
                    : 'missedButtonSubmitContainerCompleted'
                }
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

GoalDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
