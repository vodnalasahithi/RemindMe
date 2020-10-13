import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import Loader from '../../Components/Loader';
import getAllGoalsAction from '../../redux/Goals/getAllGoalsAction';
import { getAllCompletedGoals } from '../../redux/Goals/goalsSelectors';
import TextComponent from '../../Components/TextComponent';
import AddButton from '../../Components/AddButton';

const CompletedGoalsContainer = (props) => {
  const allCompletedGoalsArray = useSelector(getAllCompletedGoals);
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadAllGoals = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(getAllGoalsAction());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError]);

  useEffect(() => {
    loadAllGoals();
  }, [dispatch, loadAllGoals]);

  if (allCompletedGoalsArray.length === 0) {
    return (
      <View style={styles.loader}>
        <TextComponent text="No Goals found" />
        <AddButton
          navigation={props.navigation}
          routeName="AddGoal"
          styleType={true}
        />
      </View>
    );
  }

  if (allCompletedGoalsArray.length !== 0) {
    return props.render(allCompletedGoalsArray, loadAllGoals, isRefreshing);
  }

  return (
    <View style={styles.loader}>
      <Loader size="large" />
    </View>
  );
};

export default CompletedGoalsContainer;