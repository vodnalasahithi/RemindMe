import React, {useLayoutEffect, useCallback} from 'react';
import {View, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import {Status} from '../../Constants/Messages';
import Loader from '../../Components/Loader';
import {getAllGoals} from '../../redux/Goals/goalsSelectors';
import markGoalAsCompleteAction from '../../redux/Goals/markGoalAsCompleteAction';
import MenuButton from '../../Components/MenuButton';
import deleteGoalAction from '../../redux/Goals/deleteGoalAction';
import calculateProgressValue from '../../Helpers/calculateProgressValue';
import restartGoalAction from '../../redux/Goals/restartGoalAction';
import goalReachedAction from '../../redux/Goals/goalReachedAction';

const GoalDetailsContainer = (props) => {
  const goalID = props.route.params.id;
  const allGoalsArray = useSelector(getAllGoals);
  const dispatch = useDispatch();

  let goalDetails = {};

  goalDetails = allGoalsArray.find((item) => item.goalId === goalID);

  const deleteGoal = useCallback(() => {
    dispatch(deleteGoalAction(goalDetails, props.navigation));
  }, [dispatch, goalDetails, props.navigation]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <MenuButton
          onPress={deleteGoal}
          name="trash"
          style={styles.trashIcon}
        />
      ),
    });
  }, [props.navigation, deleteGoal]);

  const targetedProgress = 0.95238096;

  const onSubmitOfGoalComplete = async () => {
    const daysLeft = await (goalDetails.daysLeft - 1);
    const progressValue = await calculateProgressValue(daysLeft);
    const data = {
      key: goalDetails.key,
      goalId: goalDetails.goalId,
      status: goalDetails.status,
      goalDescription: goalDetails.goalDescription,
      goalStartDate: goalDetails.goalStartDate,
      goalEndDate: goalDetails.goalEndDate,
      goalTime: goalDetails.goalTime,
      email: goalDetails.email,
      daysLeft: daysLeft,
      progress: progressValue,
      goalCompletedTime: new Date().toDateString(),
      notifyTime: goalDetails.notifyTime,
      notifyId: goalDetails.notifyId,
    };
    dispatch(markGoalAsCompleteAction(data));
  };

  const onGoalReached = async () => {
    const daysLeft = await (goalDetails.daysLeft - 1);
    const progressValue = await calculateProgressValue(daysLeft);
    const data = {
      key: goalDetails.key,
      goalId: goalDetails.goalId,
      status: Status.COMPLETED,
      goalDescription: goalDetails.goalDescription,
      goalStartDate: goalDetails.goalStartDate,
      goalEndDate: goalDetails.goalEndDate,
      goalTime: goalDetails.goalTime,
      email: goalDetails.email,
      daysLeft: daysLeft,
      progress: progressValue,
      goalCompletedTime: new Date().toDateString(),
      notifyTime: goalDetails.notifyTime,
      notifyId: goalDetails.notifyId,
    };
    dispatch(goalReachedAction(data, props.navigation));
  };

  const onConfirmGoalComplete = () => {
    const goalCompletedTime = goalDetails.goalCompletedTime;

    if (goalDetails.progress === targetedProgress) {
      Alert.alert(
        'Congratulations!',
        'Kudos! You did it.',
        [{text: 'Dismiss', onPress: () => onGoalReached()}],
        {cancelable: false},
      );
    } else {
      goalCompletedTime === '' ||
      goalCompletedTime !== new Date().toDateString()
        ? Alert.alert(
            'Congratulations!',
            'Day Conquered! Keep going.',
            [{text: 'Dismiss', onPress: () => onSubmitOfGoalComplete()}],
            {cancelable: false},
          )
        : Alert.alert(
            'You have already marked this goal.',
            '',
            [{text: 'Ok'}],
            {
              cancelable: false,
            },
          );
    }
  };

  const confirmOnRestartGoal = () => {
    const data = {
      key: goalDetails.key,
      goalId: goalDetails.goalId,
      status: goalDetails.status,
      goalDescription: goalDetails.goalDescription,
      goalTime: goalDetails.goalTime,
      email: goalDetails.email,
      daysLeft: 21,
      progress: 0,
      goalStartDate: new Date().toDateString(),
      goalEndDate: new Date(
        Date.now() + 20 * 24 * 60 * 60 * 1000,
      ).toDateString(),
      goalCompletedTime: '',
      notifyTime: goalDetails.notifyTime,
      notifyId: goalDetails.notifyId,
    };
    dispatch(restartGoalAction(data));
  };

  const onRestartGoal = () => {
    Alert.alert(
      'Restart goal progress?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Confirm', onPress: () => confirmOnRestartGoal()},
      ],
      {cancelable: false},
    );
  };

  if (goalDetails === undefined) {
    return (
      <View style={styles.loader}>
        <Loader size="large" />
      </View>
    );
  }

  if (goalDetails.length !== 0) {
    return props.render(goalDetails, onConfirmGoalComplete, onRestartGoal);
  }

  return (
    <View style={styles.loader}>
      <Loader size="large" />
    </View>
  );
};

export default GoalDetailsContainer;
