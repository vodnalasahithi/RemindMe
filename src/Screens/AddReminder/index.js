import React, {useState} from 'react';
import {View, ScrollView, Platform, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

import TextInputComponent from '../../Components/TextInputComponent';
import DatePicker from '../../Components/DatePicker';
import AnimatedComponent from '../../Components/AnimatedComponent';
import addReminderAction from '../../redux/Reminders/addReminderAction';
import getAsyncStoreData from '../../Helpers/getAsyncStoreData';
import changeTimeFormat from '../../Helpers/changeTimeFormat';
import ButtonComponent from '../../Components/ButtonComponent';
import TextComponent from '../../Components/TextComponent';
import Messages, {Status} from '../../Constants/Messages';
import {Colors} from '../../Constants/Colors';
import editReminderAction from '../../redux/Reminders/editReminderAction';
import getUniqueIntegerId from '../../Helpers/getUniqueIntegerId';

const AddReminder = ({navigation, route}) => {
  const dispatch = useDispatch();

  const screenType = route.params.type;
  const reminderDetails = route.params.reminderDetails;

  const [description, setDescription] = useState(
    screenType ? reminderDetails.description : '',
  );
  const [date, setDate] = useState(new Date());
  const [reminderTime, setReminderTime] = useState(
    screenType ? reminderDetails.reminderTime : '',
  );
  const [reminderDate, setReminderDate] = useState(
    screenType ? reminderDetails.reminderDate : '',
  );

  const [notifyTime, setNotifyTime] = useState('');

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  let [message, setMessage] = useState();
  const [isValid, setIsValid] = useState(false);

  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    if (mode === 'date') {
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
    showMode('date');
  };

  const showTimePicker = () => {
    showMode('time');
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
    } else {
      const data = {
        id: uuId,
        email: userData.email,
        description: description,
        reminderDate: reminderDate,
        reminderTime: reminderTime,
        status: Status.PENDING,
        notifyTime: notifyTime,
        notifyId: getUniqueIntegerId(),
      };
      setIsValid(false);
      dispatch(addReminderAction(data));
      navigation.navigate('UpComingReminders');
    }
  };

  const onReminderEditSubmit = () => {
    const data = {
      id: reminderDetails.id,
      key: reminderDetails.key,
      description: description,
      reminderDate: reminderDate,
      reminderTime: reminderTime,
      status: Status.PENDING,
      notifyTime: notifyTime,
      notifyId: reminderDetails.notifyId,
    };
    setIsValid(false);
    dispatch(editReminderAction(data));
    navigation.navigate('ReminderDetails', {
      id: data.id,
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <TextInputComponent
          onChangeText={inputHandleChange}
          value={description}
        />
        <ButtonComponent
          onPress={showDatepicker}
          title="Date"
          icon="calendar-alt"
          container="container"
          button="button"
          iconContainer="iconContainer"
          iconStyle="icon"
          text="text"
        />
        {reminderDate !== undefined && (
          <View style={styles.viewContainer}>
            <TextComponent text={reminderDate} style={styles.textStyle} />
          </View>
        )}
        <ButtonComponent
          onPress={showTimePicker}
          title="Time"
          icon="clock"
          container="container"
          button="button"
          iconContainer="iconContainer"
          iconStyle="icon"
          text="text"
        />
        {reminderTime !== undefined && (
          <View style={styles.viewContainer}>
            <TextComponent text={reminderTime} style={styles.textStyle} />
          </View>
        )}
        {show && <DatePicker mode={mode} date={date} onChange={onChange} />}

        <ButtonComponent
          onPress={screenType ? onReminderEditSubmit : onReminderSubmit}
          title="Save"
          icon="check"
          container="submitContainer"
          button="submitButton"
          iconContainer="submitIconContainer"
          iconStyle="submitIconStyle"
          text="submitText"
        />
        {isValid && (
          <View style={styles.validMessage}>
            <AnimatedComponent message={message} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  viewContainer: {
    paddingLeft: 30,
    paddingHorizontal: 2,
    justifyContent: 'space-evenly',
    alignContent: 'flex-start',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: Colors.PRIMARY_COLOR,
  },

  validMessage: {
    padding: 20,
    bottom: 80,
  },
});

export default React.memo(AddReminder);
