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