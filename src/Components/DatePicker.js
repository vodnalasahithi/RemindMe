import React from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

const DatePicker = ({ mode, date, onChange }) => {
  return (
    <View>
      <DateTimePicker
        value={date}
        mode={mode}
        display="default"
        onChange={onChange}
        minimumDate={new Date()}
      />
    </View>
  );
};

export default DatePicker;

DatePicker.propTypes = {
  mode: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
