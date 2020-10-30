import axios from 'axios';
import { GET_COURSES_FROM_SCHEDULE, ADD_COURSE_TO_SCHEDULE, SCHEDULE_COURSES_LOADING } from './types';

export const getCourses = () => dispatch => {
    dispatch(setCoursesLoading());
    axios.get('/api/schedule').then(res =>
            dispatch({
                type: GET_COURSES_FROM_SCHEDULE,
                payload: res.data
            })
        )
};

export const addCourse = course => dispatch => {
    axios.post('/api/schedule', course).then(res =>
            dispatch({
                type: ADD_COURSE_TO_SCHEDULE,
                payload: res.data 
            })
        )
};

export const setCoursesLoading = () => {
    return {
        type: SCHEDULE_COURSES_LOADING
    }
};