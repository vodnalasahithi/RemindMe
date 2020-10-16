import { StyleSheet } from 'react-native';
import { Colors } from '../../Constants/Colors';

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

export default styles;
