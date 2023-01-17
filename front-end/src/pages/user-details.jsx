import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { loadReviews, addReview, removeReview } from '../store/review.actions'
import { loadUsers } from '../store/user.action.js'

export function UserDetails() {

  // const users = useSelector(storeState => storeState.userModule.users)
  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)

  const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutToyId: '' })

  useEffect(() => {
    loadReviews({userId: loggedInUser._id})
    // loadUsers()
  }, [])

  const onRemove = async reviewId => {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function canRemove(review) {
    return review.byUser._id === loggedInUser?._id || loggedInUser?.isAdmin
  }


  return (
    <div className="review-app">
      <h1>Reviews and Gossip</h1>
      {reviews && <ul className="review-list">
        {reviews.map(review => (
          <li key={review._id}>
            {canRemove(review) &&
              <button onClick={() => onRemove(review._id)}>X</button>}
            <p>
              About:
              <Link to={`/toy/${review.aboutToy._id}`}>
                {review.aboutToy.name}
              </Link>

            </p>
              <p>Toy Price: {review.aboutToy.price}</p>
            <h3>{review.content}</h3>
            <p>
              By:
              <Link to={`/user/${review.byUser._id}`}>
                {review.byUser.fullname}
              </Link>
            </p>
          </li>
        ))}
      </ul>}
      <hr />
    </div>
  )
}