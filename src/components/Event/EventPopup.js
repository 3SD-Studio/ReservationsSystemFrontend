import React from "react";
import { useState, useEffect } from "react";

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
        <CreateEvent setEventCreated={setEventCreated} setEventData={setEventData} roomId={props['roomId']}  handleClose={props['handleClose']}>{props['children']}</CreateEvent>
          :
        <EventInfo eventData={eventData} handleClose={props['handleClose']}>{props['children']}</EventInfo>        }
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
export function EventInfo(props) {
  return <>
    <div>
      <h3>Event created!</h3>
      <div className="grid">
        <div className="cell">
          <h4>Link to view:</h4>
          <QRCode value={"http://127.0.0.1:3000/event/" + props['eventData'].id}/>
          <br /><br />
          <Link to={"/event/" + props['eventData'].id}>{"http://127.0.0.1:3000/event/" + props['eventData'].id}</Link>
          <br /><br />
          <button>Save as JPG</button>
        </div>
        <div className="cell">
          <h4>Link to edit:</h4>
          <QRCode value={"http://127.0.0.1:3000/event/" + props['eventData'].id + "?editCode=" + props['eventData'].password} />
          <br />
          <br />
          <Link to={"/event/" + props['eventData'].id + "?editCode=" + 
              props['eventData'].password}>{"http://127.0.0.1:3000/event/" + props['eventData'].id + 
              "?editCode=" + props['eventData'].password}</Link>
          <br /><br />
          <button>Save as JPG</button>
        </div>
      </div>
      <button onClick={() => { props['handleClose'](); } }>Ok</button>
    </div>
  </>;
}



/**
 * CreateEvent component renders a popup form to add an event.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The CreateEvent component.
 */
export function CreateEvent(props) {
  const createDateTime = (date, time) => {
    return date['year'] + "-" + date['month'] + "-" + date['day'] + "T" + time + ":00"
  }

  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [link, setLink] = useState()
  const [invalidForm, setInvalidForm] = useState(true)
  const roomId = props['roomId']
  
  const form = {
    name: name, 
    description: description,
    link: link, 
    begin: createDateTime(props['children'], start), 
    end: createDateTime(props['children'], end),
    roomsId: roomId
  }

  const verifyArray = [name, description, link, start, end]
  
  useEffect(() => {
    setInvalidForm(!verifyArray.every(item => item !== undefined && item !== ""));
  }, [verifyArray]);

  return <>
    <div className="popupContent">
      <h3>Add event on {props['children']['day'] + "/" + props['children']['month'] + "/" + props['children']['year']}</h3>
      <form className="popupForm">
        <label htmlFor="name">Name:</label>
        <br />
        <input type="text" id='name' onChange={(event) => {
          setName(event.target.value)
        }} />
        <br /><br />

        <label htmlFor="description">Description:</label>
        <br />
        <textarea id="description" rows="4" cols="50" onChange={(event) => {
          setDescription(event.target.value)
        }}></textarea>
        <br /><br />

        <label htmlFor="link">Link:</label>
        <br />
        <input type="text" id='link' onChange={(event) => {
          setLink(event.target.value)
        }}/>
        <br /><br />

        <label htmlFor="startTime">Start:</label>
        <br />
        <input type="time" id='startTime' onChange={(event) => {
          setStart(event.target.value)
        }}/>
        <br /><br />

        <label htmlFor="endTime">End:</label>
        <br />
        <input type="time" id='endTime' onChange={(event) => {
          setEnd(event.target.value)
        }}/>
        <br /><br />

      </form>
      <div className="invalid-input-container">
        {invalidForm ? <p className="invalid-input">You must provide all information.</p>:<></>}
        {start >= end ? <p className="invalid-input">Start must be before end.</p> : <></>}      </div>
      <div className="buttonContainer">
        <button onClick={() => { props['handleClose'](); } }>Cancel</button>
        <button className="save-event-button" onClick={() => {
          postEvent(props['setEventCreated'], props['setEventData'], form);
        } 
        }
        disabled={start >= end || invalidForm}>Add event</button>
      </div>
    </div>
  </>;
}
