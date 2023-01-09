import { toyService } from "../services/toy.service.js"


export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTER = 'SET_FILTER'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [ {
        _id: "t101",
        name: "Talking Doll",
        price: 123,
        labels: ["Doll", "Battery Powered", "Baby"],
        createdAt: 1631031801011,
        inStock: true
    }],
    filterBy: toyService.getDefaultFilter(),
    isLoading: false,

}


export function toyReducer(state = initialState, action) {
    let toys
    switch (action.type) {
        // Todos
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case REMOVE_TOY:
            toys = state.toys.filter(t => t._id !== action.toyId)
            return { ...state, toys }
        case ADD_TOY:
            toys = [action.toy, ...state.toys]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }
        // filter
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }

        default:
            return { ...state }
    }
}