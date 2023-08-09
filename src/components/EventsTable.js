import React from "react";

import "./EventsTable.css";

export function EventsTable(props) {
  let events = props['events']
  let currentDay = props['day']

  return (
    <div className="UpcomingEventsDiv">
      {currentDay['year'] === -1 ?
        <h3 id="eventsTableHeader">Upcoming events</h3> :
        <>
          <h3>{currentDay.day + ' ' + getMonthString(currentDay.month - 1) + ' ' + currentDay.year}</h3>
          <button className="openEventAddPopup" onClick={() => { props['handleAddEvent'](); }}>Add</button>
        </>
      }
      <hr></hr>
      <div id="eventTable">
        {events === undefined ? <h1>LOADING</h1> : <>
          {events.map(event => {
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
            )
          })
          }</>}
      </div>
    </div>
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
