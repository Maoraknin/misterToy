import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toyService } from "../services/toy.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"



import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_REMOVE_MSG, SOCKET_EMIT_DELETE_MSG, SOCKET_EVENT_IS_TYPING, SOCKET_EMIT_TYPING_STATE } from '../services/socket.service.js'

export function ChatRoom({ toyId, toy, user }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    // const [topic, setTopic] = useState(toyId)

    const loggedInUser = useSelector(storeState => storeState.userModule.user)


    useEffect(() => {
        setMsgs(toy.msgs)
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toyId)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on(SOCKET_EVENT_REMOVE_MSG, removeMsg)
        socketService.on(SOCKET_EVENT_IS_TYPING, setTypingState)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EVENT_REMOVE_MSG, removeMsg)
            socketService.off(SOCKET_EVENT_IS_TYPING, setTypingState)
        }
    }, [])


    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function removeMsg(msgId) {
            setMsgs(prevMsgs => prevMsgs.filter(msg => msg.id !== msgId))
    }

    function setTypingState(isTyping){
        setIsTyping(isTyping)
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        if(value){
            socketService.emit(SOCKET_EMIT_TYPING_STATE, true)
            // setIsTyping(true)
        } 
        else{
            socketService.emit(SOCKET_EMIT_TYPING_STATE, false)
            // setIsTyping(false)
        } 
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    async function sendMsg(ev) {
        ev.preventDefault()
        // setIsTyping(false)
        socketService.emit(SOCKET_EMIT_TYPING_STATE, false)
        const newMsg = { txt: msg.txt }
        // socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        try {
            const savedMsg = await toyService.addToyMsg(toyId, newMsg.txt)
            socketService.emit(SOCKET_EMIT_SEND_MSG, savedMsg)
            showSuccessMsg(`Toy msg added`)
            addMsg(savedMsg)
            setMsg({ txt: '' })
        } catch (err) {
            showErrorMsg('Cannot add toy msg')
        }
    }


    async function onRemoveMsg(msgId) {
        console.log('msgId:', msgId)

        try {
            const removedMsg = await toyService.removeToyMsg(toyId, msgId)
            socketService.emit(SOCKET_EMIT_DELETE_MSG, removedMsg)
            removeMsg(msgId)
            showSuccessMsg(`Toy msg deleted`)
        } catch (err) {
            showErrorMsg('Cannot delete toy msg')
        }
    }



    return (
        <section className="chat-app">


            <h2>Lets Chat</h2>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

            {isTyping && <p>Typing...</p> }

            <ul>
                {msgs.map((msg, idx) => {
                    return (<li key={idx}>
                        <div className="msg-container">
                            <span>{(msg.by.fullname === loggedInUser.fullname) ? 'Me' : msg.by.fullname}: {msg.txt}</span>
                            {user.isAdmin && <span onClick={() => onRemoveMsg(msg.id)} className="material-symbols-outlined remove-msg">close</span>}
                        </div>
                    </li>)
                })}
            </ul>
        </section>
    )
}
