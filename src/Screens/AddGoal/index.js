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
import AddGoalContainer from './AddGoalContainer';
import Messages, { Icons } from '../../Constants/Messages';

const AddGoal = ({ navigation, route }) => {
  return (
    <AddGoalContainer
      navigation={navigation}
      route={route}
      render={(
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
      ) => (
        <View style={styles.screen}>
          <ScrollView>
            <TextInputComponent onChangeText={inputHandleChange} value={goalDescription} />
            <ButtonComponent
              onPress={showMode}
              title={Messages.REMIND_ME_AT}
              icon={Icons.CLOCK}
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
            {show && <DatePicker mode={Messages.TIME} date={date} onChange={onChange} />}

            <ButtonComponent
              onPress={onReminderSubmit}
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

export default React.memo(AddGoal);

AddGoal.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({}).isRequired,
};
