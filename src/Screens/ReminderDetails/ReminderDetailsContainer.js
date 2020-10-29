import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Status, Sizes, URLs, Icons } from '../../Constants/Messages';
import styles from './styles';
import Loader from '../../Components/Loader';
import { getAllReminders } from '../../redux/Reminders/addReminderSelector';
import markReminderAsCompleteAction from '../../redux/Reminders/markReminderAsCompleteAction';
import MenuButton from '../../Components/MenuButton';
import deleteReminderAction from '../../redux/Reminders/deleteReminderAction';

const ReminderDetailsContainer = (props) => {
  const { navigation, route } = props;
  let reminderDetails = {};

  const reminderID = route.params.id;

  const allRemindersArray = useSelector(getAllReminders);
  const dispatch = useDispatch();

  reminderDetails = allRemindersArray.find((item) => item.id === reminderID);

  const deleteReminder = () => {
    dispatch(deleteReminderAction(reminderDetails, props.navigation));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuButton onPress={deleteReminder} name={Icons.TRASH} style={styles.trashIcon} />
      ),
    });
  }, [navigation]);

  const editReminder = () => {
    props.navigation.navigate(URLs.AddReminder, {
      type: true,
      reminderDetails,
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
        <Loader size={Sizes.LARGE} />
      </View>
    );
  }

  if (reminderDetails.length !== 0) {
    return props.render(reminderDetails, onSubmitOfReminderComplete, editReminder);
  }

  return (
    <View style={styles.loader}>
      <Loader size={Sizes.LARGE} />
    </View>
  );
};

export default ReminderDetailsContainer;

ReminderDetailsContainer.propTypes = {
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
