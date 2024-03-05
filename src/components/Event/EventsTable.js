import React from "react";

import { EventItem } from "./EventItem";

import { getMonthString } from "../../functions/Tools";

import "./EventsTable.css";

/**
 * Renders a table of events.
 * 
 * @param {Object} props - The component props.
 * @param {Array} props.events - The array of events to display.
 * @param {Object} props.day - The current day object.
 * @param {number} props.day.year - The year of the current day.
 * @param {number} props.day.month - The month of the current day.
 * @param {number} props.day.day - The day of the current day.
 * @param {Function} props.handleAddEvent - The function to handle adding an event.
 * @returns {JSX.Element} The rendered EventsTable component.
 */
export function EventsTable(props) {
  const events = props['events']
  const currentDay = props['day']
  const today = new Date();

  return (
    <div className="upcoming-events-div">
      {currentDay['year'] === -1 ?
        <h3 id="eventsTableHeader">Upcoming events</h3> :
        <>
          <h3>{currentDay.day + ' ' + getMonthString(currentDay.month - 1) + ' ' + currentDay.year}</h3>
          <button className="openEventAddPopup" 
          onClick={() => { props['handleAddEvent'](); }}
          disabled={new Date(currentDay.year, currentDay.month - 1, currentDay.day + 1) < today}
          >Add</button>
        </>
      }
      <hr></hr>
      <div id="eventTable">
        {events === undefined ? <h1>LOADING</h1> : <EventItem events={events}/>}
      </div>
    </div>
  )
}


