import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles';
import Loader from '../../Components/Loader';
import getAllGoalsAction from '../../redux/Goals/getAllGoalsAction';
import { getAllCompletedGoals } from '../../redux/Goals/goalsSelectors';
import TextComponent from '../../Components/TextComponent';
import AddButton from '../../Components/AddButton';
import Messages, { Sizes, URLs } from '../../Constants/Messages';

const CompletedGoalsContainer = (props) => {
  const { navigation } = props;

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

  if (error) {
    return (
      <View style={styles.loader}>
        <TextComponent text={error} />
      </View>
    );
  }

  if (allCompletedGoalsArray.length === 0) {
    return (
      <View style={styles.loader}>
        <TextComponent text={Messages.NO_GOALS_FOUND} />
        <AddButton navigation={navigation} routeName={URLs.AddGoal} styleType />
      </View>
    );
  }

  if (allCompletedGoalsArray.length !== 0) {
    return props.render(allCompletedGoalsArray, loadAllGoals, isRefreshing);
  }

  return (
    <View style={styles.loader}>
      <Loader size={Sizes.LARGE} />
    </View>
  );
};

export default CompletedGoalsContainer;

CompletedGoalsContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  render: PropTypes.func.isRequired,
};
