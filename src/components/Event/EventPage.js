import React, { useEffect } from "react"
import { useState } from "react";

import { useParams, useLocation } from "react-router-dom";
import { saveEventChanges } from "../../functions/ApiUtils";
import { fetchEventData } from "../../functions/ApiUtils";

/**
 * Custom hook that parses the query parameters from the current URL.
 * 
 * @returns {URLSearchParams} The parsed query parameters.
 */
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function EventPage() {
  let { id } = useParams();
  let query = useQuery();
  let disabled = true;
  if (query.get('editCode')) {
    disabled = false;
  }

  const [event, setEvent] = useState();
  const [dateString, setDateString] = useState(new Date());
  const [beginTimeString, setBeginTimeString] = useState(new Date());
  const [endTimeString, setEndTimeString] = useState(new Date());

  const setDateAndTime = (event) => {
    setDateString(new Date(event['begin']).toISOString().split('T')[0]);
    setBeginTimeString(
      fixMinutesString(new Date(event['begin']).getHours()) + ":" +
      fixMinutesString(new Date(event['begin']).getMinutes())
    );
    setEndTimeString(
      fixMinutesString(new Date(event['end']).getHours()) + ":" +
      fixMinutesString(new Date(event['end']).getMinutes())
    );
  }

  useEffect(() => {
    fetchEventData(id, setEvent, setDateAndTime);
  }, [])

  return (
    <>
      {event === undefined ? <h1>LOADING</h1> :
        <div>
          <h1>Event</h1>
          <form>
            <label>Name</label>
            <br />
            <input
              type="text"
              name="name"
              defaultValue={event['name']}
              disabled={disabled}
              onChange={(text) => {
                event['name'] = text.target.value;
                setEvent(event);
              }} />
            <br /><br />
            <label>Link</label>
            <br />
            <input
              type="text"
              name="link"
              defaultValue={event['link']}
              disabled={disabled}
              onChange={(text) => {
                event['link'] = text.target.value;
                setEvent(event);
              }} />
            <br /><br />
            <label>Description</label>
            <br />
            <input
              type="textarea"
              name="description"
              defaultValue={event['description']}
              disabled={disabled}
              onChange={(text) => {
                event['description'] = text.target.value;
                setEvent(event);
              }} />
            <br /><br />
            <label>Date</label>
            <br />
            <input
              type="date"
              name="date"
              defaultValue={dateString}
              disabled={disabled}
              onChange={(text) => { setDateString(text.target.value); }} />
            <br /><br />
            <label>Start</label>
            <br />
            <input
              type="time"
              name="start"
              defaultValue={beginTimeString}
              disabled={disabled}
              onChange={(text) => { setBeginTimeString(text.target.value); }}
            />
            <br /><br />
            <label>End</label>
            <br />
            <input
              type="Time"
              name="end"
              defaultValue={endTimeString}
              disabled={disabled}
              onChange={(text) => { setEndTimeString(text.target.value); }} />
            <br /><br />
            {!disabled && <input type="button" value="Save" onClick={() => saveEventChanges(event, dateString, beginTimeString, endTimeString, query)} />}
          </form>
        </div>
      }
    </>
  )
}

/**
 * Fixes the minutes string by adding a leading zero if the minutes value is less than 10.
 * 
 * @param {number} minutes - The minutes value to be fixed.
 * @returns {string} - The fixed minutes string.
 */
const fixMinutesString = (minutes) => {
  if (minutes < 10) {
    return '0' + minutes
  } else {
    return minutes
  }
}