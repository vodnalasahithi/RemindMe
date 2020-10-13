import React from 'react';
import {View} from 'react-native';

import ReminderDetailsContainer from './ReminderDetailsContainer';
import styles from './styles';
import Card from '../../Components/Card';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextComponent from '../../Components/TextComponent';
import {ScrollView} from 'react-native-gesture-handler';
import ButtonComponent from '../../Components/ButtonComponent';

const ReminderDetails = ({route, navigation}) => {
  return (
    <ReminderDetailsContainer
      route={route}
      navigation={navigation}
      render={(reminderDetails, onSubmitOfReminderComplete, editReminder) => (
        <View style={styles.container}>
          <ScrollView>
            <ButtonComponent
              title="Edit"
              onPress={editReminder}
              icon="pencil-alt"
              container="editButtonContainer"
              button="editButton"
              iconContainer="editButtonIconContainer"
              iconStyle="editButtonIcon"
              text="editButtonText"
            />
            <View style={styles.mainContainer}>
              <Card style={styles.cardContainer}>
                <TextComponent
                  style={styles.textContainer}
                  text={reminderDetails.description}
                />
                <View style={styles.innerContainer}>
                  <Icon style={styles.iconStyle} name="calendar-alt" />
                  <TextComponent
                    style={styles.textStyle}
                    text={reminderDetails.reminderDate}
                  />
                </View>
                <View style={styles.innerContainer}>
                  <Icon style={styles.iconStyle} name="clock" />
                  <TextComponent
                    style={styles.textStyle}
                    text={reminderDetails.reminderTime}
                  />
                </View>
              </Card>
              <ButtonComponent
                title="Mark as complete"
                onPress={onSubmitOfReminderComplete}
                icon="check"
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
