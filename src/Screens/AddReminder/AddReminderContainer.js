import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Platform } from 'react-native';

import addReminderAction from '../../redux/Reminders/addReminderAction';
import getAsyncStoreData from '../../Helpers/getAsyncStoreData';
import changeTimeFormat from '../../Helpers/changeTimeFormat';
import Messages, { Status, URLs } from '../../Constants/Messages';
import editReminderAction from '../../redux/Reminders/editReminderAction';
import getUniqueIntegerId from '../../Helpers/getUniqueIntegerId';

const AddReminderContainer = (props) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();

  const screenType = route.params.type;
  const { reminderDetails } = route.params;

  const [description, setDescription] = useState(screenType ? reminderDetails.description : '');
  const [date, setDate] = useState(new Date());
  const [reminderTime, setReminderTime] = useState(screenType ? reminderDetails.reminderTime : '');
  const [reminderDate, setReminderDate] = useState(screenType ? reminderDetails.reminderDate : '');
  const [notifyTime, setNotifyTime] = useState(screenType ? reminderDetails.notifyTime : '');

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState(Messages.DATE);
  const [message, setMessage] = useState();
  const [isValid, setIsValid] = useState(false);

  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === Messages.IOS);
    setDate(currentDate);
    if (mode === Messages.DATE) {
      const dateFormat = currentDate.toDateString();
      setReminderDate(dateFormat);
    } else {
      const time = await changeTimeFormat(currentDate);
      setNotifyTime(currentDate);
      setReminderTime(time);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode(Messages.DATE);
  };

  const showTimePicker = () => {
    showMode(Messages.TIME);
  };

  const inputHandleChange = (desc) => {
    setDescription(desc);
  };

  const onReminderSubmit = async () => {
    const uuId = await uuid();
    const userData = await getAsyncStoreData();
    if (description === '' || reminderDate === '' || reminderTime === '') {
      setMessage(Messages.VALIDATION_MESSAGE);
      setIsValid(true);
      setTimeout(() => {
        setIsValid(false);
      }, 1000);
    } else if (notifyTime <= new Date()) {
      setMessage(Messages.ENTER_FUTURE_TIME);
      setIsValid(true);
      setTimeout(() => {
        setIsValid(false);
      }, 1000);
    } else {
      const data = {
        id: uuId,
        email: userData.email,
        description,
        reminderDate,
        reminderTime,
        status: Status.PENDING,
        notifyTime,
        notifyId: getUniqueIntegerId(),
      };
      setIsValid(false);
      dispatch(addReminderAction(data));
      navigation.navigate(URLs.UpComingReminders);
    }
  };

  const onReminderEditSubmit = () => {
    if (description === '' || reminderDate === '' || reminderTime === '') {
      setMessage(Messages.VALIDATION_MESSAGE);
      setIsValid(true);
      setTimeout(() => {
        setIsValid(false);
      }, 1000);
    } else if (notifyTime <= new Date()) {
      setMessage(Messages.ENTER_FUTURE_TIME);
      setIsValid(true);
      setTimeout(() => {
        setIsValid(false);
      }, 1000);
    } else {
      const data = {
        id: reminderDetails.id,
        key: reminderDetails.key,
        description,
        reminderDate,
        reminderTime,
        status: Status.PENDING,
        notifyTime,
        notifyId: reminderDetails.notifyId,
      };
      setIsValid(false);
      dispatch(editReminderAction(data));
      navigation.navigate(URLs.ReminderDetails, {
        id: data.id,
      });
    }
  };
  return props.render(
    inputHandleChange,
    description,
    showDatepicker,
    reminderDate,
    showTimePicker,
    reminderTime,
    show,
    mode,
    date,
    onChange,
    screenType,
    onReminderEditSubmit,
    onReminderSubmit,
    isValid,
    message
  );
};

export default AddReminderContainer;
