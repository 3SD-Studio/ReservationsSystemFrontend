/**
 * Function to fetch events for a specific day and update the state.
 * 
 * @param {Object} day - Selected day object.
 * @param {string} roomId - Room ID for fetching events.
 * @param {Function} handleSetEvent - Function to handle setting fetched events.
 */
export function fetchEvents(day, roomId, handleSetEevent) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  fetch("http://127.0.0.1:5000/room/" + roomId +
    "/events?day=" + day['day'] +
    "&month=" + day['month'] +
    "&year=" + day['year'],
    requestOptions)
    .then(response => response.text())
    .then(result => {
      result = JSON.parse(result)
      handleSetEevent(result);
    })
    .catch(error => console.log('error', error))
}


/**
 * Fetches the room data from the server and updates the state with the fetched rooms.
 * @param {function} setRooms - The state setter function for rooms.
 */
export function fetchRoomsData(setRooms) {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
  };

  fetch("http://127.0.0.1:5000/rooms", requestOptions)
    .then(response => response.json())
    .then(response => setRooms(response))
    .catch(error => console.log('error', error));
}


/**
 * Fetches room data from the server based on the provided ID and updates the room state.
 *
 * @param {number} id - The ID of the room to fetch.
 * @param {Function} setRoom - The function to update the room state.
 */
export function fetchRoomData(id, setRoom) {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:5000/room/" + id, requestOptions)
    .then(response => response.json())
    .then(response => setRoom(response))
    .catch(error => console.log('error', error));
}


/**
 * Fetches upcoming events for a given room ID.
 *
 * @param {string} id - The ID of the room.
 * @param {function} setEvents - The function to set the fetched events.
 * @returns {Array} - An empty array.
 */
export function fetchUpcomingEvents(id, setEvents) {
  let resultArray = [];
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:5000/room/" + id + "/events?limit=10", requestOptions)
    .then(response => response.text())
    .then(result => {
      setEvents(JSON.parse(result));
    })
    .catch(error => console.log('error', error));

  return resultArray;
}


/**
 * Fetches user data from the server and updates the current user state.
 *
 * @param {function} setCurrentUser - The function to update the current user state.
 */
export function fetchUserData(setCurrentUser) {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    },
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:5000/user", requestOptions)
    .then(response => response.json())
    .then(response => setCurrentUser(response))
    .catch(error => console.log('error', error));
}


/**
 * Fetches user events from the server.
 *
 * @param {Function} setUserEvents - A function to set the user events data.
 */
export function fetchUserEvents(setUserEvents) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://localhost:5000/user/events?limit=10", requestOptions)
    .then(response => response.json())
    .then(result => { console.log(result); setUserEvents(result); })
    .catch(error => console.log('error', error));
}


/**
 * Posts an event to the server.
 *
 * @param {function} setEventCreated - A function to set the event creation status.
 * @param {function} setEventData - A function to set the event data.
 * @param {object} props - The props object containing additional data.
 */
export function postEvent(setEventCreated, setEventData, props, roomId) {
  const createDateTime = (date, time) => {
    return date['year'] + "-" + date['month'] + "-" + date['day'] + "T" + time + ":00"
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

  var raw = JSON.stringify({
    "name": document.getElementById('name').value,
    "description": document.getElementById('description').value,
    "link": document.getElementById('link').value,
    "begin": createDateTime(props['children'], document.getElementById('startTime').value),
    "end": createDateTime(props['children'], document.getElementById('endTime').value),
    "roomsId": [
      parseInt(roomId)
    ]
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:5000/event", requestOptions)
    .then(response => response.json())
    .then(result => {
      setEventCreated(true);
      setEventData(result);
    })
    .catch(error => console.log('error', error));
}


/**
 * Saves the changes made to an event.
 * 
 * @param {Object} event - The event object containing the changes.
 * @param {string} dateString - The date string in the format "YYYY-MM-DD".
 * @param {string} beginTimeString - The begin time string in the format "HH:MM".
 * @param {string} endTimeString - The end time string in the format "HH:MM".
 * @param {URLSearchParams} query - The query parameters object containing the edit code.
 */
export function saveEventChanges(event, dateString, beginTimeString, endTimeString, query) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

  var raw = JSON.stringify({
    "name": event['name'],
    "description": event['description'],
    "link": event['link'],
    "begin": dateString + "T" + beginTimeString + ":00",
    "end": dateString + "T" + endTimeString + ":00",
  });

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:5000/event/" + event['id'] + "?password=" + query.get('editCode'), requestOptions)
    .catch(error => console.log('error', error));
}


/**
 * Fetches event data from the server.
 *
 * @param {number} id - The ID of the event to fetch.
 * @param {function} setEvent - The function to set the event data.
 * @param {function} setDateAndTime - The function to set the date and time data.
 */
export function fetchEventData(id, setEvent, setDateAndTime) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:5000/event/" + id, requestOptions)
    .then(response => response.json())
    .then(result => {
      setEvent(result);
      setDateAndTime(result);
    })
    .catch(error => console.log('error', error));
}


/**
 * Fetches the current user data from the server and updates the state with the user's first name.
 *
 * @param {function} setCurrentUser - The function to update the state with the user's first name.
 */
export function fetchCurrenUser(setCurrentUser) {
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
    .then(response => setCurrentUser(response['firstName']))
    .catch(error => console.log('error', error))
}

