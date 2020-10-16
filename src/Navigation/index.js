import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles';
import UpComingReminders from '../Screens/UpComingReminders';
import AddReminder from '../Screens/AddReminder';
import { Colors } from '../Constants/Colors';
import ReminderDetails from '../Screens/ReminderDetails';
import UpComingGoals from '../Screens/UpcomingGoals';
import AddGoal from '../Screens/AddGoal';
import GoalDetails from '../Screens/GoalDetails';
import CompletedReminders from '../Screens/CompletedReminders';
import CompletedGoals from '../Screens/CompletedGoals';
import MenuButton from '../Components/MenuButton';
import Login from '../Screens/Login';
import { getUserLoginStatus, getUserLoginToken } from '../redux/Login/loginSelectors';
import Authenticate from '../Screens/Authenticate';
import { logout } from '../redux/Login/loginAction';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: Colors.PRIMARY_COLOR,
  },
  headerTintColor: Colors.TEXT,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const drawerContentOptions = {
  backgroundColor: Colors.PRIMARY_COLOR,
  activeTintColor: Colors.PRIMARY_COLOR,
  inactiveTintColor: Colors.TEXT,
  activeBackgroundColor: Colors.ACCENT_COLOR,
  labelStyle: {
    fontSize: 18,
    fontWeight: 'normal',
  },
};

const toggleFunction = (navigation) => {
  navigation.toggleDrawer();
};

const UpComingRemindersNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="UpComingReminders" screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="UpComingReminders"
        component={UpComingReminders}
        options={({ navigation }) => ({
          headerTitle: 'Upcoming Reminders',
          headerLeft: () => (
            <MenuButton
              onPress={() => {
                toggleFunction(navigation);
              }}
              name="menu"
              style={styles.iconContainer}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddReminder"
        component={AddReminder}
        options={{ title: 'Add Reminder' }}
      />
      <Stack.Screen
        name="ReminderDetails"
        component={ReminderDetails}
        options={{ title: 'Reminder Details' }}
      />
    </Stack.Navigator>
  );
};

const UpComingGoalsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="UpComingGoals" screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="UpComingGoals"
        component={UpComingGoals}
        options={({ navigation }) => ({
          headerTitle: 'Goals',
          headerLeft: () => (
            <MenuButton
              onPress={() => {
                toggleFunction(navigation);
              }}
              name="menu"
              style={styles.iconContainer}
            />
          ),
        })}
      />
      <Stack.Screen name="AddGoal" component={AddGoal} options={{ title: 'Add Goal' }} />
      <Stack.Screen
        name="GoalDetails"
        component={GoalDetails}
        options={{ title: 'Goal Details' }}
      />
    </Stack.Navigator>
  );
};

const CompletedRemindersNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CompletedReminders" screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="CompletedReminders"
        component={CompletedReminders}
        options={({ navigation }) => ({
          headerTitle: 'Completed Reminders',
          headerLeft: () => (
            <MenuButton
              onPress={() => {
                toggleFunction(navigation);
              }}
              name="menu"
              style={styles.iconContainer}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddReminder"
        component={AddReminder}
        options={{ title: 'Add Reminder' }}
      />
      <Stack.Screen
        name="ReminderDetails"
        component={ReminderDetails}
        options={{ title: 'Reminder Details' }}
      />
    </Stack.Navigator>
  );
};

const CompletedGoalsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CompletedGoals" screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="CompletedGoals"
        component={CompletedGoals}
        options={({ navigation }) => ({
          headerTitle: 'Completed Goals',
          headerLeft: () => (
            <MenuButton
              onPress={() => {
                toggleFunction(navigation);
              }}
              name="menu"
              style={styles.iconContainer}
            />
          ),
        })}
      />
      <Stack.Screen name="AddGoal" component={AddGoal} options={{ title: 'Add Goal' }} />
    </Stack.Navigator>
  );
};

const LoginNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: 'TODO',
          headerTitleAlign: 'center',
          headerStyle: {
            height: 70,
            backgroundColor: Colors.PRIMARY_COLOR,
          },
          headerTintColor: Colors.TEXT,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 40,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        activeTintColor={Colors.PRIMARY_COLOR}
        inactiveTintColor={Colors.TEXT}
        activeBackgroundColor={Colors.ACCENT_COLOR}
        labelStyle={drawerContentOptions.labelStyle}
        label="Logout"
        onPress={() => {
          dispatch(logout());
        }}
      />
    </DrawerContentScrollView>
  );
};

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={drawerContentOptions}>
      <Drawer.Screen name="Upcoming Reminders" component={UpComingRemindersNavigator} />
      <Drawer.Screen name="Completed Reminders" component={CompletedRemindersNavigator} />
      <Drawer.Screen name="Upcoming Goals" component={UpComingGoalsNavigator} />
      <Drawer.Screen name="Completed Goals" component={CompletedGoalsNavigator} />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  const isUserLoggedIn = useSelector(getUserLoginStatus);
  const isAuth = useSelector(getUserLoginToken);
  return (
    <>
      {isAuth && <AppDrawer />}
      {!isAuth && isUserLoggedIn && <LoginNavigator />}
      {!isAuth && !isUserLoggedIn && <Authenticate />}
    </>
  );
};

export default AppNavigator;
