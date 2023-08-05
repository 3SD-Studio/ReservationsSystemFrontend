import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Calendar } from "./Calendar";

import './RoomPage.css'
import './UpcomingEvents.css'

const symbol = (bool) => {
    if (bool) {
        return <b className="green">&#x2713;</b>
    } else {
        return <b className="red">&#x2717;</b>
    }
} 

export function RoomPage() {
    const { id } = useParams();
    const [room, setRoom] = useState();
    const [events, setEvents] = useState();

    const fetchRoomData = () => {
      var requestOptions = {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        redirect: 'follow'
      }
        
      fetch("http://127.0.0.1:5000/room/" + id , requestOptions)
      .then(response => response.json())
      .then(response => setRoom(response))
      .catch(error => console.log('error', error));
    }

    const fetchUpcomingEvents = () => {
      let resultArray = [];
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://127.0.0.1:5000/room/" + id + "/events?limit=10", requestOptions)
        .then(response => response.text())
        .then(result =>  {
          console.log(result);
          setEvents(JSON.parse(result));
        })
        .catch(error => console.log('error', error));

      return resultArray;
    }

      
    useEffect(() => {
      fetchRoomData();
      fetchUpcomingEvents();
    }, [])
    
  
    return (
        <>
          {room === undefined ? 
          <h1>LOADING</h1> : 
          <>
            <h1>ROOM {room['name']}</h1>
            <div style={{display: "flex"}}>  
                <div className="descritpionDiv">
                    <h3 className="descriptionHeader">Description</h3>
                    <hr></hr>
                    <p>{room['description']}</p>
                    <hr></hr>
                    <p>Capacity: {room['capacity']}</p>
                    <p>Air conditioning {symbol(room['conditioning'])}</p>
                    <p>Wi-Fi {symbol(room['wifi'])}</p>
                    <p>Ethernet {symbol(room['ethernet'])}</p>
                    <p>Projector  {symbol(room['projector'])}</p>
                    <p>TV {symbol(room['tv'])}</p>
                    <p>Whiteboard {symbol(room['whiteboard'])}</p>
                </div>
                <Calendar>{room['id']}</Calendar>
                <div className="UpcomingEventsDiv">
                  <h3 id="eventsTableHeader">Upcoming events</h3>
                  <hr></hr>
                  <div id="eventTable">
                    {events === undefined ? <h1>LOADING</h1> : <>
                    {events.map(event => {
                      return (
                        <div className="eventDiv">
                          <h4>{event['name']}</h4>
                          <p>{new Date(event['begin']).toLocaleDateString()}</p>
                          <p>{event['description']}</p>
                          <p>{new Date(event['begin']).getUTCHours()}:{ fixMinutesString(new Date(event['begin']).getUTCMinutes())}</p>
                          <p>{new Date(event['end']).getUTCHours()}:{new Date(event['end']).getUTCMinutes()}</p>
                        </div>
                      )
                    })
                    }</>}
                  </div>
                </div>
            </div>
          </>
          }
        </>
    );
}

const fixMinutesString = (minutes) => { 
  if (minutes < 10) {
    return '0' + minutes
  } else {
    return minutes
  }
}