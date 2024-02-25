import React from "react";
import { useState } from "react";

import QRCode from "react-qr-code";

import "./EventPopup.css";
import { Link } from "react-router-dom";

export function EventPopup(props) {
  const [eventCreated, setEventCreated] = React.useState(false);
  const [eventData, setEventData] = React.useState(false);


  const postEvent = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

    var raw = JSON.stringify({
      "name": document.getElementById('name').value,
      "description": document.getElementById('description').value,
      "link": document.getElementById('link').value,
      "begin": createDateTime(props['children'], document.getElementById('startTime').value),
      "end": createDateTime(props['children'], document.getElementById('endTime').value),
      "roomsId": [
        parseInt(props['roomId'])
      ]
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/event", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setEventCreated(true);
        setEventData(result);
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="popupBackground">
      <div className="popupForeground">
        {!eventCreated ?
          <>
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
                <button onClick={() => { props['handleClose'](); }}>Cancel</button>
                <button onClick={() => {
                  postEvent();
                }
                }>Add event</button>
              </div>
            </div>
          </>
          :
          <>
            <div>
              <h3>Event created!</h3>
              <div class="grid">
                <div class="cell">
                  <h4>Link to view:</h4>
                  <QRCode value={"http://127.0.0.1:3000/event/"+eventData['id']}/>    
                  <br/><br/>
                  <Link to={"/event/"+eventData['id']}>{"http://127.0.0.1:3000/event/"+eventData['id']}</Link>
                  <br/><br/>
                  <button>Save as JPG</button>
                </div>
                <div class="cell">
                  <h4>Link to edit:</h4>
                  <QRCode value={"http://127.0.0.1:3000/event/"+eventData['id']+"?editCode="+eventData['password']}/>
                  <br/>
                  <br/>
                  <Link to={"/event/"+eventData['id'] +"?editCode="+eventData['password']}>{"http://127.0.0.1:3000/event/"+eventData['id']+"?editCode="+eventData['password']}</Link>
                  <br/><br/>
                  <button>Save as JPG</button>
                </div>
              </div>  
              <button onClick={() => { props['handleClose'](); }}>Ok</button>
            </div>
          </>
        }
      </div>
    </div>
  )
}

const createDateTime = (date, time) => {
  return date['year'] + "-" + date['month'] + "-" + date['day'] + "T" + time + ":00"
}