import React, {useLayoutEffect} from 'react';
import {View, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {Status} from '../../Constants/Messages';
import styles from './styles';
import Loader from '../../Components/Loader';
import {getReminderDetails} from '../../redux/Reminders/addReminderSelector';
import markReminderAsCompleteAction from '../../redux/Reminders/markReminderAsCompleteAction';
import MenuButton from '../../Components/MenuButton';
import deleteReminderAction from '../../redux/Reminders/deleteReminderAction';
const ReminderDetailsContainer = (props) => {
  const reminderID = props.route.params.id;

  const allRemindersArray = useSelector(getReminderDetails);
  const dispatch = useDispatch();

  let reminderDetails = {};

  reminderDetails = allRemindersArray.find((item) => item.id === reminderID);

  const deleteReminder = () => {
    dispatch(deleteReminderAction(reminderDetails, props.navigation));
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <MenuButton
          onPress={deleteReminder}
          name="trash"
          style={styles.trashIcon}
        />
      ),
    });
  }, [props.navigation]);

  const editReminder = () => {
    props.navigation.navigate('AddReminder', {
      type: true,
      reminderDetails: reminderDetails,
    });
  };

  const onSubmitOfReminderComplete = () => {
    const data = {
      key: reminderDetails.key,
      id: reminderDetails.id,
      status: Status.COMPLETED,
      description: reminderDetails.description,
      reminderDate: reminderDetails.reminderDate,
      reminderTime: reminderDetails.reminderTime,
      email: reminderDetails.email,
    };
    dispatch(markReminderAsCompleteAction(data, props.navigation));
  };

  if (reminderDetails === undefined) {
    return (
      <View style={styles.loader}>
        <Loader size="large" />
      </View>
    );
  }

  if (reminderDetails.length !== 0) {
    return props.render(
      reminderDetails,
      onSubmitOfReminderComplete,
      editReminder,
    );
  }

  return (
    <View style={styles.loader}>
      <Loader size="large" />
    </View>
  );
};

export default ReminderDetailsContainer;
