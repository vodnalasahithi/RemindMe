import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import CompletedGoalsContainer from './CompletedGoalsContainer';
import styles from './styles';
import AddButton from '../../Components/AddButton';
import GetGoalDataIntoCard from '../../Components/GetGoalDataIntoCard';
import { URLs } from '../../Constants/Messages';

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
                touchableOpacity={styles.touchableOpacity}
                navigationFunction={() =>
                  navigation.navigate(URLs.GoalDetails, {
                    id: itemData.item.goalId,
                  })
                }
              />
            )}
          />
          <AddButton navigation={navigation} routeName={URLs.AddGoal} styleType={false} />
        </View>
      )}
    />
  );
};

export default React.memo(CompletedGoals);

CompletedGoals.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
