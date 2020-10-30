import { combineReducers } from 'redux';
import scheduleReducer from './scheduleReducer';
import courseReducer from './courseReducer'

export default combineReducers({
    course: courseReducer,
    schedule: scheduleReducer
});