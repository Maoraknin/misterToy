import { signup, logout, login } from '../store/user.action.js'
// import { userService } from '../services/user.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { UserProfile } from './user-profile.jsx'
import { userService } from '../services/user.service.js'
import { Fragment, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// const { useNavigate } = ReactRouterDOM
// const {useSelector} = ReactRedux

export function Login() {

  const [credentails, setCredentials] = useState(userService.getEmptyCredentials())
  const [isSignupState, setIsSignupState] = useState(false)
  const user = useSelector((storeState => storeState.userModule.user))
  const navigate = useNavigate()


  function handleChange({ target }) {
    let { value, name: field } = target
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    const funcs = { signup, login }
    const method = isSignupState ? 'signup' : 'login'
    return funcs[method](credentails)
      .then((user) => {
        showSuccessMsg(`Welcome ${user.fullname}`)
        // navigate('/toy')
      })
      .catch((err) => showErrorMsg('Oops try again'))
  }

  function onToggleSignupState(ev) {
    ev.preventDefault()
    setIsSignupState(!isSignupState)
  }

  function onLogout() {
    logout()
    userService.logout()
  }



  const { fullname, username, password } = credentails

  return <section className="login">
    {!user && <form className='login-form' onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">User name:</label>
        <input type="text"
          id='username'
          name="username"
          placeholder="User name.."
          value={username}
          onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password :</label>
        <input type="password"
          name="password"
          id='password'
          placeholder="Password"
          value={password}
          onChange={handleChange} />
      </div>
      {isSignupState && <Fragment>
        <div>
          <label htmlFor='fullname'>Full name:</label>
          <input type="text"
            id='fullname'
            name="fullname"
            placeholder="Full name.."
            value={fullname}
            onChange={handleChange} />
        </div>
      </Fragment>
      }

      <button className='login-btn'>{isSignupState ? 'Sign up' : 'Login'}</button>
      <a className='signup-link' href="#" onClick={onToggleSignupState}>
        {isSignupState ? 'Already a member ? Login' : 'New user ? sign up here'}
      </a>
    </form>}
    {user && <div className='user-profile'>
      <h2 className='user-greeting'>Hello {user.fullname}</h2>
      <button className='logout-btn' onClick={onLogout}>Logout</button>
    </div>}

    <div><Link to= '/user'>Go to profile</Link></div>

  </section>
}