import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import Loader from '../../Components/Loader';
import getAllRemindersAction from '../../redux/Reminders/getAllReminderAction';
import { getReminderDetails } from '../../redux/Reminders/addReminderSelector';
import TextComponent from '../../Components/TextComponent';
import AddButton from '../../Components/AddButton';
import Messages from '../../Constants/Messages';

const UpComingReminderContainer = (props) => {
  const allRemindersArray = useSelector(getReminderDetails);
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

  if (allRemindersArray.length === 0) {
    return (
      <View style={styles.loader}>
        <TextComponent text={Messages.NO_REMINDERS_FOUND} />
        <AddButton navigation={props.navigation} routeName="AddReminder" styleType />
      </View>
    );
  }

  if (allRemindersArray.length !== 0) {
    return props.render(allRemindersArray, loadAllReminders, isRefreshing, dispatch);
  }

  return (
    <View style={styles.loader}>
      <Loader size="large" />
    </View>
  );
};

export default UpComingReminderContainer;
