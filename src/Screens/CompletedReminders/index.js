import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import CompletedRemindersContainer from './CompletedRemindersContainer';
import styles from './styles';
import AddButton from '../../Components/AddButton';
import GetReminderDataIntoCard from '../../Components/GetReminderDataIntoCard';
import { URLs } from '../../Constants/Messages';

const CompletedReminders = ({ navigation }) => {
  return (
    <CompletedRemindersContainer
      navigation={navigation}
      render={(completedRemindersArray, loadAllReminders, isRefreshing) => (
        <View style={styles.container}>
          <FlatList
            onRefresh={loadAllReminders}
            refreshing={isRefreshing}
            data={completedRemindersArray}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <GetReminderDataIntoCard
                time={itemData.item.reminderTime}
                date={itemData.item.reminderDate}
                description={itemData.item.description}
                status={itemData.item.status}
                id={itemData.item.id}
                cardContainer={styles.cardContainer}
                text={styles.text}
                touchableOpacity={styles.touchableOpacity}
                navigationFunction={() =>
                  navigation.navigate(URLs.ReminderDetails, {
                    id: itemData.item.id,
                    // reminderDetails: itemData.item,
                  })
                }
              />
            )}
          />
          <AddButton navigation={navigation} routeName={URLs.AddReminder} styleType={false} />
        </View>
      )}
    />
  );
};

export default React.memo(CompletedReminders);

CompletedReminders.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
