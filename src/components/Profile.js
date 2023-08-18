import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import { EventItem } from './EventItem';

export function Profile(props) {
  const [currentUser, setCurrentUser] = useState();
  const [userEvents, setUserEvents] = useState();

  const fetchUserData = () => {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      redirect: 'follow'
    }

    fetch("http://127.0.0.1:5000/user", requestOptions)
      .then(response => response.json())
      .then(response => setCurrentUser(response))
      .catch(error => console.log('error', error));
  }

  const fetchUserEvents = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/user/events?limit=10", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);setUserEvents(result)})
      .catch(error => console.log('error', error));
  }


  useEffect(() => {
    fetchUserData();
    fetchUserEvents();
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

