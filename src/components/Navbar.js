import React, { useEffect } from 'react';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './Navbar.css'

export function Navbar(props) {
  const navigate = useNavigate();
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
            <li><Link to="/">Hi, {currentUser}</Link></li>
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