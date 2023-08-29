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

  const fetchEventData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/event/" + id, requestOptions)
      .then(response => response.json())
      .then(result => setEvent(result))
      .catch(error => console.log('error', error));
  }

  const saveEventChanges = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIwODk5MDgsImlhdCI6MTY5MjAwMzUwOCwic3ViIjoyfQ.SeYaKjTKXKadIfcisG_N3OACL-wB7KS7gKrLyb29JLM");
    
    var raw = JSON.stringify({
      "name": event['name'],
      "description": event['description'],
      "link": event['link'],
      "begin": "2023-08-20T09:00:00",
      "end": "2023-08-20T09:30:00",
      "roomsId": [
        1
      ]
    });
    
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("127.0.0.1:5000/event/21?password=CeOy5Z7v", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetchEventData()
  }, [])

  return (
    <>
      {event === undefined ? <h1>LOADING</h1> :
        <div>
          <h1>Event</h1>
          <form>
            <label>Name</label>
            <br />
            <input type="text" name="name" defaultValue={event['name']} disabled={disabled} />
            <br /><br />
            <label>Link</label>
            <br />
            <input type="text" name="name" defaultValue={event['link']} disabled={disabled} />
            <br /><br />
            <label>Description</label>
            <br />
            <input type="text" name="name" defaultValue={event['description']} disabled={disabled} />
            <br /><br />
            <label>Date</label>
            <br />
            <input type="date" name="name" defaultValue={new Date(event['begin']).getUTCDate().toLocaleString()} disabled={disabled} />
            <br /><br />
            <label>Start</label>
            <br />
            <input type="time" name="name" defaultValue={fixMinutesString(new Date(event['begin']).getHours()) + ":" + fixMinutesString(new Date(event['begin']).getMinutes())} disabled={disabled} />
            <br /><br />
            <label>End</label>
            <br />
            <input type="Time" name="name" defaultValue={fixMinutesString(new Date(event['end']).getHours()) + ":" + fixMinutesString(new Date(event['end']).getMinutes())} disabled={disabled} />
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