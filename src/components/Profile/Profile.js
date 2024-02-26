import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import { EventItem } from '../Event/EventItem';
import { fetchUserData, fetchUserEvents } from '../../functions/ApiUtils';

/**
 * Renders the user profile component.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered user profile component.
 */
export function Profile(props) {
  const [currentUser, setCurrentUser] = useState();
  const [userEvents, setUserEvents] = useState();


  useEffect(() => {
    fetchUserData(setCurrentUser);
    fetchUserEvents(setUserEvents);
  }, [])

  return (
    <>
      {currentUser !== undefined && currentUser !== null ?
        <>
          <h1>Profile</h1>
          <h2>First name: {currentUser['firstName']}</h2>
          <h2>Last name:  {currentUser['lastName']}</h2>
          <h2>email:      {currentUser['email']}</h2>
          <h3>Upcoming events:</h3>
          {userEvents === undefined ? <h1>LOADING</h1> : <EventItem events={userEvents} />}
        </>
        : <h1>LOADING</h1>
      }
    </>
  )
}
