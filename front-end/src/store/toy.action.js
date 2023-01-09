import { toyService } from '../services/toy.service.js'
// import { userService } from '../services/user.service.js'
import { store } from './store.js'
import { SET_TOYS, ADD_TOY, UPDATE_TOY, REMOVE_TOY, SET_FILTER, SET_IS_LOADING } from './toy.reducer.js'
// import {  UPDATE_USER } from './user.reducer.js'

export function loadToys(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy)
        .then((toys) => {
            store.dispatch({ type: SET_TOYS, toys })


        })
        .catch(err => {
            console.log('Had issues loading toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeToy(toy) {
    const toyId = toy._id
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
            // const user = userService.getLoggedinUser()
            // const activities = { txt: `removed the toy: ${toy.txt} `, at: Date.now() }
            // user.activities.unshift(activities)
            // store.dispatch({ type: UPDATE_USER, user })
            // userService.put(user)

        })
        .catch(err => {
            console.log('Had issues Removing toy', err)
            throw err
        })
}

export function setFilter(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    // const msg = toy._id ? 'Edited' : 'Added' 

    return toyService.save(toy)
        .then((savedToy) => {
            store.dispatch({ type: type, toy: savedToy })
            // const user = userService.getLoggedinUser()
            // const activities = { txt: `${msg} the toy: ${toy.txt} `, at: Date.now() }
            // user.activities.unshift(activities)
            // store.dispatch({ type: UPDATE_USER, user })
            // userService.put(user)
            return savedToy
        })
        .catch((err) => {
            console.error('Cannot save toy:', err)
            throw err
        })
}
