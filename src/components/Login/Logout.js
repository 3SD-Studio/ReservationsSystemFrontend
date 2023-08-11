import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import "./Login.css";


export function Logout() {
    localStorage.removeItem("token");
    const [timer, setTimer] = React.useState(5);

    const startTimer = (timer) => {
        setTimeout(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
            else {
                window.location.href = '/rooms';
            }
        }, 1000)
    }
    useEffect(() => {
        startTimer(timer);
    })

    return (
        <div className='formBox'>
            <h3>You have been logged out</h3>
            <h4>Redirecting to main page in {timer} seconds</h4>
            <div id="link">
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}