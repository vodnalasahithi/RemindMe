import React from 'react';
import { View, FlatList } from 'react-native';

import UpComingReminderContainer from './UpComingRemindersContainer';
import styles from './styles';
import AddButton from '../../Components/AddButton';
import GetReminderDataIntoCard from '../../Components/GetReminderDataIntoCard';
import { Status } from '../../Constants/Messages';
import markReminderAsMissedAction from '../../redux/Reminders/markReminderAsMissedAction';

const UpComingReminders = ({ navigation }) => {
  return (
    <UpComingReminderContainer
      navigation={navigation}
      render={(allRemindersArray, loadAllReminders, isRefreshing, dispatch) => (
        <View style={styles.container}>
          <FlatList
            onRefresh={loadAllReminders}
            refreshing={isRefreshing}
            data={allRemindersArray}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => {
              if (
                new Date(itemData.item.notifyTime) < new Date(Date.now()) &&
                itemData.item.status === Status.PENDING
              ) {
                dispatch(markReminderAsMissedAction(itemData.item));
              }
              return (
                <GetReminderDataIntoCard
                  time={itemData.item.reminderTime}
                  date={itemData.item.reminderDate}
                  description={itemData.item.description}
                  status={itemData.item.status}
                  id={itemData.item.id}
                  cardContainer={styles.cardContainer}
                  touchableOpacity={styles.touchableOpacity}
                  text={styles.text}
                  navigationFunction={() =>
                    navigation.navigate('ReminderDetails', {
                      id: itemData.item.id,
                    })
                  }
                />
              );
            }}
          />
          <AddButton navigation={navigation} routeName="AddReminder" styleType />
        </View>
      )}
    />
  );
};

export default React.memo(UpComingReminders);
