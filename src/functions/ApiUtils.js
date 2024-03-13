const URL = "http://127.0.0.1:5000";

/**
 * Represents a RequestObject used for making API requests.
 */
class Request {
  #endpoint
  #requestOptions
  #setHandler
  #errorHandler

  /**
   * Creates a new RequestObject.
   * @param {string} endpoint - The API endpoint.
   * @param {string} [method="GET"] - The HTTP method.
   * @param {Object} [body={}] - The request body.
   * @param {Function} [setHandler=(request) => {}] - The success handler function.
   * @param {Function} [errorHandler=(error) => console.log('error', error)] - The error handler function.
   */
  constructor(endpoint,
    method = "GET",
    body = {},
    setHandler = (request) => { },
    errorHandler = (error) => console.log('error', error)) {
    this.#endpoint = endpoint

    const headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')


    this.#requestOptions = {
      method: method,
      headers: headers,
      redirect: "follow"
    }

    if (method !== 'GET') {
      this.#requestOptions.body = body
    }

    this.#setHandler = setHandler
    this.#errorHandler = errorHandler
  }

  /**
   * Adds authorization token to the request headers.
   * @param {string} token - The authorization token.
   */
  addAuth(token) {
    this.#requestOptions.headers.append("Authorization", "Bearer " + token)
  }

  /**
   * Sets the request headers.
   * @param {Object} headers - The request headers.
   */
  set headers(headers) {
    this.#requestOptions.headers = headers
  }

  /**
   * Sets the request body.
   * @param {Object} body - The request body.
   */
  set body(body) {
    this.#requestOptions.body = body
  }

  /**
   * Sets the HTTP method.
   * @param {string} method - The HTTP method.
   */
  set method(method) {
    this.#requestOptions.method = method
  }

  /**
   * Gets the request options.
   * @returns {Object} - The request options.
   */
  get requestOptions() {
    return this.#requestOptions
  }

  /**
   * Gets the API endpoint.
   * @returns {string} - The API endpoint.
   */
  get endpoint() {
    return this.#endpoint
  }

  /**
   * Sets the API endpoint.
   * @param {string} endpoint - The API endpoint.
   */
  set endpoint(endpoint) {
    this.#endpoint = endpoint
  }

  /**
   * Gets the success handler function.
   * @returns {Function} - The success handler function.
   */
  get setHandler() {
    return this.#setHandler
  }

  /**
   * Sets the success handler function.
   * @param {Function} setHandler - The success handler function.
   */
  set setHandler(setHandler) {
    this.#setHandler = setHandler
  }

  /**
   * Gets the error handler function.
   * @returns {Function} - The error handler function.
   */
  get errorHandler() {
    return this.#errorHandler
  }

  /**
   * Sets the error handler function.
   * @param {Function} errorHandler - The error handler function.
   */
  set errorHandler(errorHandler) {
    this.#errorHandler = errorHandler
  }
}

/**
 * Fetches data from the API using the provided request object.
 *
 * @param {Request} requestObject - The request object containing the necessary information for the API call.
 */
function fetchFromApi(requestObject) {
  const requestOptions = requestObject.requestOptions

  fetch(URL + requestObject.endpoint, requestOptions)
    .then((response) => response.json())
    .then((responseJSON) => requestObject.setHandler(responseJSON))
    .catch((error) => requestObject.errorHandler(error))
}

/**
 * Function to fetch events for a specific day and update the state.
 *
 * @param {Object} day - Selected day object.
 * @param {string} roomId - Room ID for fetching events.
 * @param {Function} handleSetEvent - Function to handle setting fetched events.
 */
export function fetchEvents(day, roomId, handleSetEvent) {
  const endpoint = "/room/" + roomId +
    "/events?day=" + day['day'] +
    "&month=" + day['month'] +
    "&year=" + day['year']

  const requestObject = new Request(endpoint)
  requestObject.setHandler = (response) => handleSetEvent(response)

  fetchFromApi(requestObject)
}


/**
 * Fetches the room data from the server and updates the state with the fetched rooms.
 * @param {function} setRooms - The state setter function for rooms.
 */
export function fetchRoomsData(setRooms) {
  const requestObject = new Request("/rooms")
  requestObject.setHandler = (response) => setRooms(response)

  fetchFromApi(requestObject)
}


/**
 * Fetches room data from the server based on the provided ID and updates the room state.
 *
 * @param {number} id - The ID of the room to fetch.
 * @param {Function} setRoom - The function to update the room state.
 */
export function fetchRoomData(id, setRoom) {
  const requestObject = new Request("/room/" + id)
  requestObject.setHandler = (response) => setRoom(response)

  fetchFromApi(requestObject)
}


/**
 * Fetches upcoming events for a given room ID.
 *
 * @param {string} id - The ID of the room.
 * @param {function} setEvents - The function to set the fetched events.
 * @returns {Array} - An empty array.
 */
export function fetchUpcomingEvents(id, setEvents) {
  const requestObject = new Request("/room/" + id + "/events?limit=10")
  requestObject.setHandler = (response) => setEvents(response)

  fetchFromApi(requestObject)
}


/**
 * Fetches user data from the server and updates the current user state.
 *
 * @param {function} setCurrentUser - The function to update the current user state.
 */
export function fetchUserData(setCurrentUser) {
  const requestObject = new Request("/user")
  requestObject.setHandler = (response) => setCurrentUser(response)
  requestObject.addAuth(localStorage.getItem('token'))

  fetchFromApi(requestObject)
}


/**
 * Fetches user events from the server.
 *
 * @param {Function} setUserEvents - A function to set the user events data.
 */
export function fetchUserEvents(setUserEvents) {
  const requestObject = new Request("/user/events?limit=10")
  requestObject.setHandler = (response) => setUserEvents(response)
  requestObject.addAuth(localStorage.getItem('token'))

  fetchFromApi(requestObject)
}


/**
 * Posts an event to the server.
 *
 * @param {function} setEventCreated - A function to set the event creation status.
 * @param {function} setEventData - A function to set the event data.
 * @param {object} form - Object containing event data (Request body).
 */
export function postEvent(setEventCreated, setEventData, form) {
  const requestObject = new Request("/event", "POST", JSON.stringify(form), (result) => {
    setEventCreated(true);
    setEventData(result);
  })
  requestObject.addAuth(localStorage.getItem('token'))
  fetchFromApi(requestObject)
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
export function saveEventChanges(eventId, form, query) {
  const requestObject = new Request("/event/" + eventId + "?password=" + query.get('editCode'))
  requestObject.method = "PATCH";
  requestObject.addAuth(localStorage.getItem('token'));
  requestObject.body = JSON.stringify(form);

  fetchFromApi(requestObject);
}


/**
 * Fetches event data from the server.
 *
 * @param {number} id - The ID of the event to fetch.
 * @param {function} setEvent - The function to set the event data.
 * @param {function} setDateAndTime - The function to set the date and time data.
 */
export function fetchEventData(id, setEvent, setDateAndTime) {
  const requestObject = new Request("/event/" + id)
  requestObject.setHandler = (response) => {
    setEvent(response);
    setDateAndTime(response)
  }

  fetchFromApi(requestObject)
}

/**
 * Fetches the current user data from the server and updates the state with the user's first name.
 *
 * @param {function} setCurrentUser - The function to update the state with the user's first name.
 */
export function fetchCurrentUsername(setCurrentUser) {
  const requestObject = new Request("/user")
  requestObject.setHandler = (response) => setCurrentUser(response['firstName'])
  requestObject.addAuth(localStorage.getItem('token'))

  fetchFromApi(requestObject)
}


/**
 * Logs out the user by sending a GET request to the logout endpoint.
 *
 * @param {string} token - The user's authentication token.
 */
export function logout(token) {
  const requestObject = new Request('/logout')
  requestObject.addAuth(token)
  requestObject.setHandler = (response) => { console.log(response) }

  fetchFromApi(requestObject)
}

/**
 * Logs in the user by sending a POST request to the login endpoint with the provided email and password.
 * If the login is successful, it stores the received token in the local storage and redirects the user to the rooms page.
 * If the login fails, it displays an alert with an error message.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 */
export function logUser(email, password) {
  var raw = JSON.stringify({
    "email": email,
    "password": password
  });

  const requestObject = new Request("/login", "POST", raw, (response) => {
    if (response.token) {
      localStorage.setItem('token', response.token);
      window.location.href = '/rooms';
    }
  }, (error) => { alert("Wrong username or password!") })


  fetchFromApi(requestObject)
}

