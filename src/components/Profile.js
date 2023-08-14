import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

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
          {userEvents === undefined ? <h1>LOADING</h1> : userEvents.map(event => {
            return (
              <div className="eventDiv">
                <h4>{event['name']}</h4>
                <p>{new Date(event['begin']).toLocaleDateString()}</p>
                <p>{event['description']}</p>
                <p>{new Date(event['begin']).getUTCHours()}:
                  {
                    fixMinutesString(new Date(event['begin']).getUTCMinutes())
                  }</p>
                <p>{new Date(event['end']).getUTCHours()}:{fixMinutesString(new Date(event['end']).getUTCMinutes())}</p>
              </div>   
          )})}
        </>
        : <h1>LOADING</h1>
      }
    </>
  )
}

const fixMinutesString = (minutes) => {
  if (minutes < 10) {
    return '0' + minutes
  } else {
    return minutes
  }
}

const getMonthString = (month) => {
  let array = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

  return array[month];
}