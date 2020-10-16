import React, { useLayoutEffect, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles';
import Messages, { Icons, Sizes } from '../../Constants/Messages';
import Loader from '../../Components/Loader';
import { getAllGoals } from '../../redux/Goals/goalsSelectors';
import MenuButton from '../../Components/MenuButton';
import deleteGoalAction from '../../redux/Goals/deleteGoalAction';
import onSubmitOfGoalComplete from './onSubmitOfGoalComplete';
import onGoalReached from './onGoalReached';
import confirmOnRestartGoal from './confirmOnRestartGoal';

const GoalDetailsContainer = (props) => {
  const { route, navigation } = props;
  const goalID = route.params.id;
  const allGoalsArray = useSelector(getAllGoals);
  const dispatch = useDispatch();

  let goalDetails = {};

  goalDetails = allGoalsArray.find((item) => item.goalId === goalID);

  const deleteGoal = useCallback(() => {
    dispatch(deleteGoalAction(goalDetails, navigation));
  }, [dispatch, goalDetails, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuButton onPress={deleteGoal} name={Icons.TRASH} style={styles.trashIcon} />
      ),
    });
  }, [navigation, deleteGoal]);

  const targetedProgress = 0.95238096;

  const alertFunction = () => {
    const { goalCompletedTime } = goalDetails;

    if (goalCompletedTime === '' || goalCompletedTime !== new Date().toDateString()) {
      Alert.alert(
        Messages.CONGRATULATIONS,
        Messages.DAY_CONQUERED,
        [{ text: Messages.DISMISS, onPress: () => onSubmitOfGoalComplete(goalDetails, dispatch) }],
        { cancelable: false }
      );
    } else {
      Alert.alert(Messages.ALREADY_MARKED_GOAL, '', [{ text: Messages.OK }], {
        cancelable: false,
      });
    }
  };
  const onConfirmGoalComplete = () => {
    if (goalDetails.progress === targetedProgress) {
      Alert.alert(
        Messages.CONGRATULATIONS,
        Messages.KUDOS_YOU_DID_IT,
        [
          {
            text: Messages.DISMISS,
            onPress: () => onGoalReached(goalDetails, navigation, dispatch),
          },
        ],
        { cancelable: false }
      );
    } else {
      alertFunction();
    }
  };

  const onRestartGoal = () => {
    Alert.alert(
      Messages.RESTART_GOAL_PROGRESS,
      '',
      [
        {
          text: Messages.CANCEL,
          style: 'cancel',
        },
        { text: Messages.CONFIRM, onPress: () => confirmOnRestartGoal(goalDetails, dispatch) },
      ],
      { cancelable: false }
    );
  };

  if (goalDetails === undefined) {
    return (
      <View style={styles.loader}>
        <Loader size={Sizes.LARGE} />
      </View>
    );
  }

  if (goalDetails.length !== 0) {
    return props.render(goalDetails, onConfirmGoalComplete, onRestartGoal);
  }

  return (
    <View style={styles.loader}>
      <Loader size={Sizes.LARGE} />
    </View>
  );
};

export default GoalDetailsContainer;

GoalDetailsContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  render: PropTypes.func.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
