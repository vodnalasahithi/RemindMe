/* eslint-disable react/jsx-props-no-spreading */
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
import Messages, { Icons, URLs } from '../Constants/Messages';

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

const menuButton = (navigation) => {
  return (
    <MenuButton
      onPress={() => {
        toggleFunction(navigation);
      }}
      name={Icons.MENU}
      style={styles.iconContainer}
    />
  );
};

const UpComingRemindersNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={URLs.UpComingReminders} screenOptions={defaultStackOptions}>
      <Stack.Screen
        name={URLs.UpComingReminders}
        component={UpComingReminders}
        options={({ navigation }) => ({
          headerTitle: URLs.UpComingReminders,
          headerLeft: () => menuButton(navigation),
        })}
      />
      <Stack.Screen
        name={URLs.AddReminder}
        component={AddReminder}
        options={{ title: URLs.AddReminder }}
      />
      <Stack.Screen
        name={URLs.ReminderDetails}
        component={ReminderDetails}
        options={{ title: URLs.ReminderDetails }}
      />
    </Stack.Navigator>
  );
};

const UpComingGoalsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={URLs.UpComingGoals} screenOptions={defaultStackOptions}>
      <Stack.Screen
        name={URLs.UpComingGoals}
        component={UpComingGoals}
        options={({ navigation }) => ({
          headerTitle: Messages.GOALS_TITLE,
          headerLeft: () => menuButton(navigation),
        })}
      />
      <Stack.Screen name={URLs.AddGoal} component={AddGoal} options={{ title: URLs.AddGoal }} />
      <Stack.Screen
        name={URLs.GoalDetails}
        component={GoalDetails}
        options={{ title: URLs.GoalDetails }}
      />
    </Stack.Navigator>
  );
};

const CompletedRemindersNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={URLs.CompletedReminders} screenOptions={defaultStackOptions}>
      <Stack.Screen
        name={URLs.CompletedReminders}
        component={CompletedReminders}
        options={({ navigation }) => ({
          headerTitle: URLs.CompletedReminders,
          headerLeft: () => menuButton(navigation),
        })}
      />
      <Stack.Screen
        name={URLs.AddReminder}
        component={AddReminder}
        options={{ title: URLs.AddReminder }}
      />
      <Stack.Screen
        name={URLs.ReminderDetails}
        component={ReminderDetails}
        options={{ title: URLs.ReminderDetails }}
      />
    </Stack.Navigator>
  );
};

const CompletedGoalsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={URLs.CompletedGoals} screenOptions={defaultStackOptions}>
      <Stack.Screen
        name={URLs.CompletedGoals}
        component={CompletedGoals}
        options={({ navigation }) => ({
          headerTitle: URLs.CompletedGoals,
          headerLeft: () => menuButton(navigation),
        })}
      />
      <Stack.Screen name={URLs.AddGoal} component={AddGoal} options={{ title: URLs.AddGoal }} />
      <Stack.Screen
        name={URLs.GoalDetails}
        component={GoalDetails}
        options={{ title: URLs.GoalDetails }}
      />
    </Stack.Navigator>
  );
};

const LoginNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={URLs.Login}>
      <Stack.Screen
        name={URLs.Login}
        component={Login}
        options={{
          headerTitle: Messages.APP_TITLE,
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
        label={URLs.Logout}
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
      <Drawer.Screen name={URLs.UpComingReminders} component={UpComingRemindersNavigator} />
      <Drawer.Screen name={URLs.CompletedReminders} component={CompletedRemindersNavigator} />
      <Drawer.Screen name={URLs.UpComingGoals} component={UpComingGoalsNavigator} />
      <Drawer.Screen name={URLs.CompletedGoals} component={CompletedGoalsNavigator} />
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
