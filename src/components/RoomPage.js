//Import react library and hooks
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Import css for this component
import './RoomPage.css'

//Import components 
import { EventPopup } from "./EventPopup";
import { RoomDescription } from "./RoomDescription";
import { EventsTable } from "./EventsTable";
import { Calendar } from "./Calendar";


export function RoomPage() {
    const { id } = useParams();
    const [room, setRoom] = useState();
    const [events, setEvents] = useState();
    const [eventPopupOpen, setEventPopupOpen] = useState(false);
    const [currentDay, setCurrentDay] = useState({'day': -1, 'month': -1, 'year': -1});

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
                <RoomDescription>{room}</RoomDescription>
                <Calendar hadnleSetDay={(day) => setCurrentDay(day)} handleSetEevent={(events) => setEvents(events)}>{room['id']}</Calendar>
                <EventsTable day={currentDay} events={events} handleAddEvent={() => {setEventPopupOpen(true);}}></EventsTable>
                {eventPopupOpen && <EventPopup  handleClose={() => {setEventPopupOpen(false);}} roomId={id}>{currentDay}</EventPopup>}
            </div>
          </>
          }
        </>
    );
}
