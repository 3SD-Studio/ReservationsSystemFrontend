import React from "react";

import { EventItem } from "./EventItem";

import "./EventsTable.css";

export function EventsTable(props) {
  const events = props['events']
  const currentDay = props['day']

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
        {events === undefined ? <h1>LOADING</h1> : <EventItem events={events}/>}
      </div>
    </div>
  )
}

const getMonthString = (month) => {
  let array = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

  return array[month];
}
