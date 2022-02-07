// import types
import { FETCH_USERS, DELETE_USER, ADD_USER, UPDATE_USER, FETCH_USER } from "../types";

// declare initial state
const INITIAL_STATE = {
    users: [],
};

const AppReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case FETCH_USER:
            return {
                ...state,
                user: action.payload,
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
            };
        case ADD_USER:
            return {
                ...state,
                user: action.payload
            };
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}

export default AppReducer;