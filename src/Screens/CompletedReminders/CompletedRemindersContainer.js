import React, {useEffect, useState, useCallback} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';
import Loader from '../../Components/Loader';
import getAllRemindersAction from '../../redux/Reminders/getAllReminderAction';
import {getCompletedReminders} from '../../redux/Reminders/addReminderSelector';
import TextComponent from '../../Components/TextComponent';
import AddButton from '../../Components/AddButton';

const CompletedRemindersContainer = (props) => {
  const completedRemindersArray = useSelector(getCompletedReminders);
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadAllReminders = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(getAllRemindersAction());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError]);

  useEffect(() => {
    loadAllReminders();
  }, [dispatch, loadAllReminders]);

  if (completedRemindersArray.length === 0) {
    return (
      <View style={styles.loader}>
        <TextComponent text="No reminders found" />
        <AddButton
          navigation={props.navigation}
          routeName="AddReminder"
          styleType={true}
        />
      </View>
    );
  }

  if (completedRemindersArray.length !== 0) {
    return props.render(
      completedRemindersArray,
      loadAllReminders,
      isRefreshing,
    );
  }

  return (
    <View style={styles.loader}>
      <Loader size="large" />
    </View>
  );
};

export default CompletedRemindersContainer;