import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles';
import Loader from '../../Components/Loader';
import getAllGoalsAction from '../../redux/Goals/getAllGoalsAction';
import { getAllPendingGoals } from '../../redux/Goals/goalsSelectors';
import TextComponent from '../../Components/TextComponent';
import AddButton from '../../Components/AddButton';
import Messages, { URLs, Sizes } from '../../Constants/Messages';

const UpcomingGoalsContainer = (props) => {
  const allGoalsArray = useSelector(getAllPendingGoals);
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

  if (error) {
    return (
      <View style={styles.loader}>
        <TextComponent text={error} />
      </View>
    );
  }

  if (allGoalsArray.length === 0) {
    return (
      <View style={styles.loader}>
        <TextComponent text={Messages.NO_GOALS_FOUND} />
        <AddButton navigation={props.navigation} routeName={URLs.AddGoal} styleType />
      </View>
    );
  }

  if (allGoalsArray.length !== 0) {
    return props.render(allGoalsArray, loadAllGoals, isRefreshing);
  }

  return (
    <View style={styles.loader}>
      <Loader size={Sizes.LARGE} />
    </View>
  );
};

export default UpcomingGoalsContainer;

UpcomingGoalsContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  render: PropTypes.func.isRequired,
};
