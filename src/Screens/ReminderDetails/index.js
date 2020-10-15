import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import ReminderDetailsContainer from './ReminderDetailsContainer';
import styles from './styles';
import Card from '../../Components/Card';
import TextComponent from '../../Components/TextComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import Messages, { Icons } from '../../Constants/Messages';

const ReminderDetails = ({ route, navigation }) => {
  return (
    <ReminderDetailsContainer
      route={route}
      navigation={navigation}
      render={(reminderDetails, onSubmitOfReminderComplete, editReminder) => (
        <View style={styles.container}>
          <ScrollView>
            <ButtonComponent
              title={Messages.EDIT}
              onPress={editReminder}
              icon={Icons.PENCIL_ALT}
              container="editButtonContainer"
              button="editButton"
              iconContainer="editButtonIconContainer"
              iconStyle="editButtonIcon"
              text="editButtonText"
            />
            <View style={styles.mainContainer}>
              <Card style={styles.cardContainer}>
                <TextComponent style={styles.textContainer} text={reminderDetails.description} />
                <View style={styles.innerContainer}>
                  <Icon style={styles.iconStyle} name={Icons.CALENDAR_ALT} />
                  <TextComponent style={styles.textStyle} text={reminderDetails.reminderDate} />
                </View>
                <View style={styles.innerContainer}>
                  <Icon style={styles.iconStyle} name={Icons.CLOCK} />
                  <TextComponent style={styles.textStyle} text={reminderDetails.reminderTime} />
                </View>
              </Card>
              <ButtonComponent
                title={Messages.MARK_AS_COMPLETE}
                onPress={onSubmitOfReminderComplete}
                icon={Icons.CHECK}
                container="submitContainer"
                button="markAsCompleteButton"
                iconContainer="submitIconContainer"
                iconStyle="submitIconStyle"
                text="submitText"
              />
            </View>
          </ScrollView>
        </View>
      )}
    />
  );
};

export default ReminderDetails;

ReminderDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
