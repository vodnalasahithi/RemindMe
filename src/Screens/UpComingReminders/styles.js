import { StyleSheet } from 'react-native';
import { Colors } from '../../Constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    padding: 10,
    height: 100,
  },
  text: {
    fontSize: 18,
    fontStyle: 'normal',
    color: Colors.PRIMARY_COLOR,
    fontWeight: 'normal',
  },
  touchableOpacity: {
    backgroundColor: Colors.PRIMARY_COLOR,
  },
});

export default styles;
