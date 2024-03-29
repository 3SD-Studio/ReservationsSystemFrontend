import React from "react";

import { Link } from 'react-router-dom';

import './Navbar.css'

/**
 * Renders the navigation bar component.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.currentUser - The current user's name.
 * @returns {JSX.Element} The rendered navigation bar.
 */
export function Navbar(props) {
  let currentUser = props['currentUser'];

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">Reservation system</Link>
        <ul className='left'>
          <li>
            <div className='linkWrapper'>
              <Link to="/rooms">Rooms</Link>
            </div>
          </li>
        </ul>
        <ul id="navUser">
          {currentUser ? <>
            <li><Link to="/profile">Hi, {currentUser}</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </> :
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          }
        </ul>
      </div>
    </nav>
  )
}
