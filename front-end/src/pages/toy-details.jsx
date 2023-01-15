import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from 'react-redux'
import { loadReviews, addReview, removeReview } from '../store/review.actions'
// import { Link, useNavigate, useParams } from "react-router-dom"

import 'animate.css';


export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const user = useSelector((storeState) => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [])




    async function loadToy() {

        try {
            const toy = await toyService.getById(toyId)
            console.log('here');
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }

    }

    async function onAddReview(ev) {
        ev.preventDefault()
        const { review } = ev.target
        const content = review.value
        review.value = ''
        // if (!reviewToEdit.txt || !reviewToEdit.aboutUserId) return alert('All fields are required')
        try {
            const savedReview = await addReview({ content: content, aboutToyId: toyId })
            await toyService.addToyReview(toyId, savedReview)
            loadToy()
            showSuccessMsg('Review added')
            // setReviewToEdit()
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
    }


    async function onAddMsg(ev) {
        ev.preventDefault()
        const { msg } = ev.target
        const txt = msg.value
        msg.value = ''
        try {
            const savedToy = await toyService.addToyMsg(toyId, txt)
            loadToy()
            showSuccessMsg(`Toy msg added (id: ${savedToy._id})`)
        } catch (err) {
            showErrorMsg('Cannot add toy msg')
        }
    }

    async function onRemoveMsg(msgId) {
        console.log('msgId:', msgId)

        try {
            const savedToy = await toyService.removeToyMsg(toyId, msgId)
            loadToy()
            showSuccessMsg(`Toy msg deleted (id: ${savedToy._id})`)
        } catch (err) {
            showErrorMsg('Cannot delete toy msg')
        }
    }

    async function onRemoveReview(reviewId) {

        try {
            await removeReview(reviewId)
            await toyService.removeToyReview(toyId, reviewId)
            loadToy()
            showSuccessMsg(`Toy review deleted (id: ${reviewId})`)
        } catch (err) {
            showErrorMsg('Cannot delete toy review')
        }
    }
    


    return (
        <article className="animate__animated animate__fadeIn">
            {toy ? <div>
                <img className='details-toy-img' src={require(`../assets/img/toys/${toy.imgUrl}`)} />

                <p>{toy.name}</p>
                <p>{toy.price}$</p>
                <p>{toy.labels.toString()}</p>
                <p>{utilService.timeSince(toy.createdAt)}</p>
                <p>{toy.inStock}</p>
                <p>{toy.smsg}</p>
            </div> : <h2>Loading...</h2>}
            {/* <h4>Toy  <span onClick={onSetIsDone} className="material-symbols-outlined icon done-indicator">{ toy.isDone ? 'task_alt' : 'circle' }</span>  </h4> */}


            <Link to="/toy">Back to List</Link>

            <div>
                {user &&
                    <div>
                        <form onSubmit={onAddMsg} className="add-msg-form" id="msg-form">
                            <textarea placeholder="Enter msg..." name="msg" form="msg-form" className="msg-input"></textarea>
                            <button className="add-msg-btn">Add Msg</button>
                        </form>
                    </div>}

                {toy && toy.msgs && <ul>
                    {toy.msgs.map(msg => {
                        return <li key={msg.id}><div className="msg-container"><span>{msg.txt}</span>{user.isAdmin && <span onClick={() => onRemoveMsg(msg.id)} className="material-symbols-outlined remove-msg">close</span>}</div></li>
                    })}</ul>}
            </div>

            <div>
                {user &&
                    <div>
                        <form onSubmit={onAddReview} className="add-review-form" id="review-form">
                            {/* <input type="text"
                        name="msg"
                        placeholder="Enter msg..."
                    /> */}
                            <textarea placeholder="Enter Review..." name="review" form="review-form" className="review-input"></textarea>
                            <button className="add-review-btn">Add Review</button>
                        </form>
                    </div>}

                {toy?.reviews?.length ? <ul>
                    {toy.reviews.map(review => {
                        return <li key={review._id}><div className="review-container"><span>{review.content}</span>{user.isAdmin && <span onClick={() => onRemoveReview(review._id)} className="material-symbols-outlined remove-review">close</span>}</div></li>
                    })}</ul> : <h2>No Reviews</h2>}
            </div>
        </article >)
}
