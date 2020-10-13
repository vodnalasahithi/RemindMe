import React from 'react';
import { View, FlatList } from 'react-native';

import CompletedGoalsContainer from './CompletedGoalsContainer';
import styles from './styles';
import AddButton from '../../Components/AddButton';
import GetGoalDataIntoCard from '../../Components/GetGoalDataIntoCard';
const CompletedGoals = ({ navigation }) => {
  return (
    <CompletedGoalsContainer
      navigation={navigation}
      render={(allCompletedGoalsArray, loadAllGoals, isRefreshing) => (
        <View style={styles.container}>
          <FlatList
            onRefresh={loadAllGoals}
            refreshing={isRefreshing}
            data={allCompletedGoalsArray}
            keyExtractor={(item) => item.goalId}
            renderItem={(itemData) => (
              <GetGoalDataIntoCard
                daysLeft={itemData.item.daysLeft}
                goalDescription={itemData.item.goalDescription}
                goalId={itemData.item.goalId}
                cardContainer={styles.cardContainer}
                text={styles.text}
              />
            )}
          />
          <AddButton
            navigation={navigation}
            routeName="AddGoal"
            styleType={false}
          />
        </View>
      )}
    />
  );
};

export default React.memo(CompletedGoals);
