import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import UpcomingGoalsContainer from './UpcomingGoalsContainer';
import styles from './styles';
import AddButton from '../../Components/AddButton';
import GetGoalDataIntoCard from '../../Components/GetGoalDataIntoCard';
import { URLs } from '../../Constants/Messages';

const UpcomingGoals = ({ navigation }) => {
  return (
    <UpcomingGoalsContainer
      navigation={navigation}
      render={(allGoalsArray, loadAllGoals, isRefreshing) => (
        <View style={styles.container}>
          <FlatList
            onRefresh={loadAllGoals}
            refreshing={isRefreshing}
            data={allGoalsArray}
            keyExtractor={(item) => item.goalId}
            renderItem={(itemData) => (
              <GetGoalDataIntoCard
                daysLeft={itemData.item.daysLeft}
                goalDescription={itemData.item.goalDescription}
                goalId={itemData.item.goalId}
                cardContainer={styles.cardContainer}
                touchableOpacity={styles.touchableOpacity}
                text={styles.text}
                navigationFunction={() =>
                  navigation.navigate(URLs.GoalDetails, {
                    id: itemData.item.goalId,
                  })
                }
              />
            )}
          />
          <AddButton navigation={navigation} routeName={URLs.AddGoal} styleType />
        </View>
      )}
    />
  );
};

export default React.memo(UpcomingGoals);

UpcomingGoals.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
