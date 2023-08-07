import React from "react";

import "./EventPopup.css";

export function EventPopup(props) {
  const postEvent = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": document.getElementById('name').value,
      "description": document.getElementById('description').value,
      "link": document.getElementById('link').value,
      "begin": createDateTime(props['children'], document.getElementById('startTime').value),
      "end": createDateTime(props['children'], document.getElementById('endTime').value),
      "ownerId": 1,
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
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="popupBackground">
      <div className="popupForeground">
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
              props['handleClose']();
            }
            }>Add event</button>
          </div>
        </div>
      </div>
    </div>)
}

const createDateTime = (date, time) => {
  return date['year'] + "-" + date['month'] + "-" + date['day'] + "T" + time + ":00"
}