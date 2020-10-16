import { useState } from 'react';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import addNewGoalAction from '../../redux/Goals/addNewGoalAction';
import getAsyncStoreData from '../../Helpers/getAsyncStoreData';
import changeTimeFormat from '../../Helpers/changeTimeFormat';
import Messages, { Status, URLs } from '../../Constants/Messages';
import getUniqueIntegerId from '../../Helpers/getUniqueIntegerId';

const AddGoalContainer = (props) => {
  const { route, navigation } = props;
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
    setShow(Platform.OS === Messages.IOS);
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
        daysLeft: Messages.TOTAL_DAYS,
        progress: 0,
        goalCompletedTime: '',
        notifyTime,
        notifyId: getUniqueIntegerId(),
      };
      setIsValid(false);
      dispatch(addNewGoalAction(data));
      navigation.navigate(URLs.UpComingGoals);
    }
  };

  return props.render(
    inputHandleChange,
    goalDescription,
    showMode,
    goalTime,
    show,
    date,
    onChange,
    onReminderSubmit,
    isValid,
    message
  );
};

export default AddGoalContainer;
