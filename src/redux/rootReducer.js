import {combineReducers} from 'redux';
import loginReducer from './Login/loginReducer';
import addReminderReducer from './Reminders/addReminderReducer';
import goalsReducer from './Goals/goalsReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  reminder: addReminderReducer,
  goals: goalsReducer,
});

export default rootReducer;
