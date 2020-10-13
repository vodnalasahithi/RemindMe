import React, { useState } from 'react';
import { View, ScrollView, Platform, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import TextInputComponent from '../../Components/TextInputComponent';
import DatePicker from '../../Components/DatePicker';
import AnimatedComponent from '../../Components/AnimatedComponent';
import addNewGoalAction from '../../redux/Goals/addNewGoalAction';
import getAsyncStoreData from '../../Helpers/getAsyncStoreData';
import changeTimeFormat from '../../Helpers/changeTimeFormat';
import ButtonComponent from '../../Components/ButtonComponent';
import TextComponent from '../../Components/TextComponent';
import Messages, { Status } from '../../Constants/Messages';
import { Colors } from '../../Constants/Colors';
import getUniqueIntegerId from '../../Helpers/getUniqueIntegerId';

const AddGoal = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const screenType = route.params.type;
  const { goalDetails } = route.params;

  const [goalDescription, setGoalDescription] = useState(
    screenType ? goalDetails.goalDescription : ''
  );

  const [date, setDate] = useState(new Date());
  const [notifyTime, setNotifyTime] = useState('');

  const [goalTime, setGoalTime] = useState(screenType ? goalDetails.goalTime : '');

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();
  const [isValid, setIsValid] = useState(false);

  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setNotifyTime(currentDate);
    const time = await changeTimeFormat(currentDate);
    setGoalTime(time);
  };

  const showMode = () => {
    setShow(true);
  };

  const inputHandleChange = (desc) => {
    setGoalDescription(desc);
  };

  const onReminderSubmit = async () => {
    const uuId = await uuid();
    const userData = await getAsyncStoreData();
    if (goalDescription === '' || goalTime === '') {
      setMessage(Messages.VALIDATION_MESSAGE);
      setIsValid(true);
      setTimeout(() => {
        setIsValid(false);
      }, 1000);
    } else {
      const data = {
        goalId: uuId,
        email: userData.email,
        goalDescription,
        goalTime,
        status: Status.PENDING,
        goalStartDate: new Date().toDateString(),
        goalEndDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toDateString(),
        daysLeft: 21,
        progress: 0,
        goalCompletedTime: '',
        notifyTime,
        notifyId: getUniqueIntegerId(),
      };
      setIsValid(false);
      dispatch(addNewGoalAction(data));
      navigation.navigate('UpComingGoals');
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <TextInputComponent onChangeText={inputHandleChange} value={goalDescription} />
        <ButtonComponent
          onPress={showMode}
          title="Remind me at"
          icon="clock"
          container="container"
          button="button"
          iconContainer="iconContainer"
          iconStyle="icon"
          text="text"
        />
        {goalTime !== undefined && (
          <View style={styles.viewContainer}>
            <TextComponent text={goalTime} style={styles.textStyle} />
          </View>
        )}
        {show && <DatePicker mode="time" date={date} onChange={onChange} />}

        <ButtonComponent
          onPress={onReminderSubmit}
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
    bottom: 20,
  },
});

export default React.memo(AddGoal);
