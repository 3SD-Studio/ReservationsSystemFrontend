import React from 'react';
import { useEffect } from 'react';

import "./Login.css";
import { logout } from '../../functions/ApiUtils';

/**
 * Logout component.
 * Removes token from local storage and redirects to the main page after a specified time.
 *
 * @returns {JSX.Element} The rendered Logout component.
 */
export function Logout() {
    const token = localStorage.getItem("token")
    localStorage.removeItem("token");
    const [timer, setTimer] = React.useState(5);

    const startTimer = (timer) => {
        setTimeout(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
            else {
                window.location.reload(true);
                window.location.href = '/rooms';
            }
        }, 1000)
    }
    useEffect(() => {
        logout(token);
    }, [])

    useEffect(() => {
        startTimer(timer);
    })

    return (
        <div className='formBox'>
            <h3>You have been logged out</h3>
            <h4>Redirecting to main page in {timer} seconds</h4>
            <div id="link">
                <a href="/login">Login</a>
            </div>
        </div>
    )
}