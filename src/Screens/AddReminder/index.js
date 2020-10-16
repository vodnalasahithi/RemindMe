import React from 'react';
import { View, ScrollView } from 'react-native';
import 'react-native-get-random-values';
import PropTypes from 'prop-types';

import TextInputComponent from '../../Components/TextInputComponent';
import DatePicker from '../../Components/DatePicker';
import AnimatedComponent from '../../Components/AnimatedComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import TextComponent from '../../Components/TextComponent';
import styles from './styles';
import AddReminderContainer from './AddReminderContainer';
import Messages, { Icons } from '../../Constants/Messages';

const AddReminder = ({ navigation, route }) => {
  return (
    <AddReminderContainer
      navigation={navigation}
      route={route}
      render={(
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
      ) => (
        <View style={styles.screen}>
          <ScrollView>
            <TextInputComponent onChangeText={inputHandleChange} value={description} />
            <ButtonComponent
              onPress={showDatepicker}
              title={Messages.DATE_TITLE}
              icon={Icons.CALENDAR_ALT}
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
              title={Messages.TIME_TITLE}
              icon={Icons.CLOCK}
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
              title={Messages.SAVE}
              icon={Icons.CHECK}
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
      )}
    />
  );
};

export default React.memo(AddReminder);

AddReminder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({}).isRequired,
};
