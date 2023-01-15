

import { NavLink, Link } from 'react-router-dom'
import { useState } from "react"
import 'animate.css';

import toyImg from '../assets/img/toy-shop.png'
import mapImg from '../assets/img/map.png'
import chartImg from '../assets/img/chart.png'
import homeImg from '../assets/img/home-background.jpg'
import { useSelector } from 'react-redux'


export function AppHeader() {

    const [isClicked, setIsClicked] = useState(false)
    const user = useSelector((storeState) => storeState.userModule.user)



    return (
        <header className="app-header full main-layout">
            <Link to="/" className="app-header-logo" onClick={() => setIsClicked(false)}>
                <h3>Mister Toy</h3>
            </Link>

            <Link to="/login"><div className='header-profile-container'><span className="material-symbols-outlined profile-img">account_circle</span>
                {user ? <h4 className='username-header'>{user.fullname}</h4> : <h4 className='username-header'>Login</h4>  }</div></Link>

            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/review">Review</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>

            <span onClick={() => setIsClicked(!isClicked)} className="material-symbols-outlined menu-btn">menu</span>
            {isClicked && <div className="header-modal animate__animated animate__fadeInDown">
                <NavLink onClick={() => setIsClicked(!isClicked)} to="/toy"><img src={toyImg} /></NavLink>
                <NavLink onClick={() => setIsClicked(!isClicked)} to="/"><img src={homeImg} /></NavLink>
                <NavLink onClick={() => setIsClicked(!isClicked)} to="/dashboard"><img src={chartImg} /></NavLink>
                <NavLink onClick={() => setIsClicked(!isClicked)} to="/about"><img src={mapImg} /></NavLink>

            </div>}

        </header>
    )
}
