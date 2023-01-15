// import { userService } from "../../services/user.service.js"
// import {store } from '../store.js'
import { SET_USER, SET_WATCHED_USER, REMOVE_USER, SET_USERS } from './user.reducer.js'
import { userService } from '../services/user.service.js'
import { store } from './store.js'
// import { SET_USER } from './user.reducer.js'
import { showErrorMsg } from '../services/event-bus.service'



// export async function loadUsers() {
//     try {
//         store.dispatch({ type: 'LOADING_START' })
//         const users = await userService.getUsers()
//         store.dispatch({ type: 'SET_USERS', users })
//     } catch (err) {
//         console.log('UserActions: err in loadUsers', err)
//     } finally {
//         store.dispatch({ type: 'LOADING_DONE' })
//     }
// }

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {

    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } 
    catch (err) {
        console.log('Cannot login', err)
        throw err
    }

}

export async function signup(credentials) {
    
    // if(credentials.username === 'admin') credentials.isAdmin = true
    // console.log('credentials.isAdmin:',credentials.isAdmin)

    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }

}

export async function updateUser(user) {

    try {
        await userService.save(user)
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        console.log('Cannot save user', err)
        throw err
    }


}




export async function logout() {

    try {
        const user = await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
        return user
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }


}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId);
        store.dispatch({ type: 'SET_WATCHED_USER', user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}