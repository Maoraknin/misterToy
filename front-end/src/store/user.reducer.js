// import { userService } from "../../services/user.service.js"

import { userService } from "../services/user.service.js"

export const SET_USER = 'SET_USER'
// export const ADD_ACTIVITY = 'ADD_ACTIVITY'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'

const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser : null
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case SET_WATCHED_USER:
            state = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            state = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
        case SET_USERS:
            state = { ...state, users: action.users }
            break
        default:
            return { ...state }
    }
}