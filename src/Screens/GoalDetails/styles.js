import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';

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
  trashIcon: {
    paddingRight: 10,
  },
  mainContainer: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    padding: 20,
  },
  cardContainer: {
    padding: 20,
    height: 250,
    borderColor: Colors.PRIMARY_COLOR,
    borderRadius: 10,
    borderWidth: 2,
    overflow: 'hidden',
    shadowColor: Colors.PRIMARY_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.26,
    elevation: 16,
  },

  textContainer: {
    fontSize: 20,
    fontStyle: 'normal',
    color: Colors.PRIMARY_COLOR,
    fontWeight: 'bold',
  },
  innerContainer: {
    padding: 10,
    paddingLeft: 0,
    flexDirection: 'row',
  },

  iconStyle: {
    color: Colors.PRIMARY_COLOR,
    fontSize: 25,
  },
  textStyle: {
    left: 10,
    fontSize: 20,
    fontStyle: 'normal',
    color: Colors.PRIMARY_COLOR,
    fontWeight: 'bold',
  },
  fontWeightStyle: {
    fontWeight: 'normal',
  },
  progressBar: {
    padding: 10,
    transform: [{scaleX: 1.0}, {scaleY: 4.0}],
  },
  viewContainer: {
    paddingHorizontal: 2,
    justifyContent: 'space-evenly',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  daysLeftTextStyle: {
    fontSize: 20,
    fontStyle: 'normal',
    color: Colors.PRIMARY_COLOR,
    fontWeight: 'normal',
  },
});

export default styles;
