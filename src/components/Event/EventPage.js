import React, { useEffect } from "react"
import { useState } from "react";

import { useParams, useLocation } from "react-router-dom";

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

  const fetchEventData = () => {
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

  const saveEventChanges = () => {
    
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
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

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
    fetchEventData();
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
            {!disabled && <input type="button" value="Save" onClick={() => saveEventChanges()} />}
          </form>
        </div>
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