import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    const [activeNav, setActiveNav] = useState(false)
    return (
        <header className='main-wrapper-x header'>
            <div className='header-wrapper'>
               <div  className='logo-holder'>
                <Link to='/'>S<span>e</span>r<span>e</span>n<span>e</span></Link>
               </div>
                <nav className={`navigation ${activeNav? "active": ''}`}>
                    <ul className='nav-list'>
                        <li className='nav-item'><NavLink activeClassName="active" to='/'>Home</NavLink></li>
                        <li className='nav-item'><NavLink activeClassName="active"  to='/menu'>Menu</NavLink></li>
                        <li className='nav-item'><NavLink activeClassName="active" to='/contact-us'>Contact us</NavLink></li>
                    </ul>
                </nav>
                
                <div className='reservation-link d-flx-alc-jfe'>
                    <NavLink activeClassName="active" to='/reservations'>Reservations</NavLink>
                    <button className={`mobile-toggler ${activeNav? "show-mobile": ''}`} onClick={()=>setActiveNav(activeNav=>!activeNav)}> 
                        <span></span>
                    </button>
                    
                </div>
            </div>
        </header>
    )
}

export default Header
