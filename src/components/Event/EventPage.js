import { useEffect } from "react"
import { useState } from "react";

import { useParams } from "react-router-dom";
import { saveEventChanges } from "../../functions/ApiUtils";
import { fetchEventData } from "../../functions/ApiUtils";

import { fixMinutesString } from "../../functions/Tools";
import { useQuery } from "../../functions/Tools";

import './EventPage.css'

/**
 * Renders the EventPage component.
 * 
 * @returns {JSX.Element} The rendered EventPage component.
 */
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
          <h1 className="event-header">Event</h1>
          <div className="event-form">
          <form>
            <label htmlFor="name">Name</label>
            <br />
            <input
              id="name"
              type="text"
              name="name"
              defaultValue={event['name']}
              disabled={disabled}
              onChange={(text) => {
                event['name'] = text.target.value;
                setEvent(event);
              }} />
            <br /><br />
            <label htmlFor="link">Link</label>
            <br />
            <input
              id="link"
              type="text"
              name="link"
              defaultValue={event['link']}
              disabled={disabled}
              onChange={(text) => {
                event['link'] = text.target.value;
                setEvent(event);
              }} />
            <br /><br />
            <label htmlFor="description">Description</label>
            <br />
            <input
              id="description"
              type="textarea"
              name="description"
              defaultValue={event['description']}
              disabled={disabled}
              onChange={(text) => {
                event['description'] = text.target.value;
                setEvent(event);
              }} />
            <br /><br />
            <label htmlFor="date">Date</label>
            <br />
            <input
              id="date"
              type="date"
              name="date"
              defaultValue={dateString}
              disabled={disabled}
              onChange={(text) => { setDateString(text.target.value); }} />
            <br /><br />
            <label htmlFor="start">Start</label>
            <br />
            <input
              id="start"
              type="time"
              name="start"
              defaultValue={beginTimeString}
              disabled={disabled}
              onChange={(text) => { setBeginTimeString(text.target.value); }}
            />
            <br /><br />
            <label htmlFor="end">End</label>
            <br />
            <input
              id="end"
              type="Time"
              name="end"
              defaultValue={endTimeString}
              disabled={disabled}
              onChange={(text) => { setEndTimeString(text.target.value); }} />
            <br /><br />
            {!disabled && <input type="button" value="Save" onClick={() => {
               var form = {
                "name": event['name'],
                "description": event['description'],
                "link": event['link'],
                "begin": dateString + "T" + beginTimeString + ":00",
                "end": dateString + "T" + endTimeString + ":00",
              };
              saveEventChanges(event['id'], form, query)}
             } />}
          </form>
          </div>
        </div>
      }
    </>
  )
}
