import { GET_COURSES_FROM_SCHEDULE, ADD_COURSE_TO_SCHEDULE, SCHEDULE_COURSES_LOADING } from '../actions/types';

const initialState = {
    courses: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_COURSES_FROM_SCHEDULE:
            return {
                ...state,
                courses: action.payload,
                loading: false
            }
        case ADD_COURSE_TO_SCHEDULE:
            return {
                ...state,
                courses: [action.payload, ...state.courses]
            }
        case SCHEDULE_COURSES_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }

}