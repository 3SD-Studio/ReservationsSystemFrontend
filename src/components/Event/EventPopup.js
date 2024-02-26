import React from "react";
import { useState } from "react";

import QRCode from "react-qr-code";

import "./EventPopup.css";
import { Link } from "react-router-dom";
import { postEvent } from "../../functions/ApiUtils";

/**
 * Renders a popup component for adding events.
 * 
 * @param {Object} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
export function EventPopup(props) {
  const [eventCreated, setEventCreated] = React.useState(false);
  const [eventData, setEventData] = React.useState(false);
  
  return (
    <div className="popupBackground">
      <div className="popupForeground">
        {!eventCreated ?
          createEvent(props, setEventCreated, setEventData)
          :
          eventInfo(eventData, props)
        }
      </div>
    </div>
  )
}


/**
 * Renders the event information popup.
 * 
 * @param {Object} eventData - The data of the event.
 * @param {Object} props - The props passed to the component.
 * @returns {JSX.Element} - The rendered event information popup.
 */
function eventInfo(eventData, props) {
  return <>
    <div>
      <h3>Event created!</h3>
      <div class="grid">
        <div class="cell">
          <h4>Link to view:</h4>
          <QRCode value={"http://127.0.0.1:3000/event/" + eventData['id']} />
          <br /><br />
          <Link to={"/event/" + eventData['id']}>{"http://127.0.0.1:3000/event/" + eventData['id']}</Link>
          <br /><br />
          <button>Save as JPG</button>
        </div>
        <div class="cell">
          <h4>Link to edit:</h4>
          <QRCode value={"http://127.0.0.1:3000/event/" + eventData['id'] + "?editCode=" + eventData['password']} />
          <br />
          <br />
          <Link to={"/event/" + eventData['id'] + "?editCode=" + eventData['password']}>{"http://127.0.0.1:3000/event/" + eventData['id'] + "?editCode=" + eventData['password']}</Link>
          <br /><br />
          <button>Save as JPG</button>
        </div>
      </div>
      <button onClick={() => { props['handleClose'](); } }>Ok</button>
    </div>
  </>;
}


/**
 * Creates an event popup.
 * 
 * @param {Object} props - The props object.
 * @param {Function} setEventCreated - The function to set the event created flag.
 * @param {Function} setEventData - The function to set the event data.
 * @returns {JSX.Element} - The event popup component.
 */
function createEvent(props, setEventCreated, setEventData) {
  return <>
    <div className="popupContent">
      <h3>Add event on {props['children']['day'] + "/" + props['children']['month'] + "/" + props['children']['year']}</h3>
      <form className="popupForm">
        <label for="name">Name:</label>
        <br />
        <input type="text" id='name' />
        <br /><br />

        <label for="description">Description:</label>
        <br />
        <textarea id="description" rows="4" cols="50"></textarea>
        <br /><br />

        <label for="link">Link:</label>
        <br />
        <input type="text" id='link' />
        <br /><br />

        <label for="startTime">Start:</label>
        <br />
        <input type="time" id='startTime' />
        <br /><br />

        <label for="endTime">End:</label>
        <br />
        <input type="time" id='endTime' />
        <br /><br />

      </form>
      <div className="buttonContainer">
        <button onClick={() => { props['handleClose'](); } }>Cancel</button>
        <button onClick={() => {
          postEvent(setEventCreated, setEventData, props);
        } }>Add event</button>
      </div>
    </div>
  </>;
}
