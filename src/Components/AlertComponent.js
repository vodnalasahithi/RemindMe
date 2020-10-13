import {Alert} from 'react-native';

const AlertComponent = ({
  title,
  subTitle,
  cancel,
  confirm,
  confirmFunction,
}) => {
  return Alert.alert(
    title,
    subTitle,
    [
      {
        text: cancel,
        style: 'cancel',
      },
      {text: confirm, onPress: () => confirmFunction()},
    ],
    {cancelable: false},
  );
};

export default AlertComponent;
