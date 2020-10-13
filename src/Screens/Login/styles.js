import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
    textDecorationColor: 'black',
  },
  title: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: Colors.PRIMARY_COLOR,
    fontSize: 25,
    textAlign: 'center',
  },
});

export default styles;
