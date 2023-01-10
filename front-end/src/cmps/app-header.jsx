

import { NavLink, Link } from 'react-router-dom'

export function AppHeader() {


    return (
        <header className="app-header">
            <Link to="/" className="app-header-logo">
                <h3>Mister Toy</h3>
            </Link>

            <nav>
                <NavLink to="/">Home</NavLink> 
                <NavLink to="/toy">Toys</NavLink> 
                <NavLink to="/about">About</NavLink> 
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>

        </header>
    )
}
