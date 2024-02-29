//Import react library and hooks
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Import css for this component
import './RoomPage.css'

//Import components 
import { EventPopup } from "../Event/EventPopup";
import { RoomDescription } from "./RoomDescription";
import { EventsTable } from "../Event/EventsTable";
import { Calendar } from "../Calendar/Calendar";
import { fetchRoomData, fetchUpcomingEvents } from "../../functions/ApiUtils";

/**
 * Renders the RoomPage component.
 * 
 * @returns {JSX.Element} The rendered RoomPage component.
 */
export function RoomPage() {
    const { id } = useParams();
    const [room, setRoom] = useState();
    const [events, setEvents] = useState();
    const [eventPopupOpen, setEventPopupOpen] = useState(false);
    const [currentDay, setCurrentDay] = useState({'day': -1, 'month': -1, 'year': -1});
    
    useEffect(() => {
      fetchRoomData(id, setRoom);
      fetchUpcomingEvents(id, setEvents);
    }, [])
    
    return (
        <>
          {room === undefined ? 
          <h1>LOADING</h1> : 
          <>
            <h1>ROOM {room['name']}</h1>
            <div style={{display: "flex"}}>  
                <RoomDescription>{room}</RoomDescription>
                <Calendar handleSetDay={(day) => setCurrentDay(day)} handleSetEevent={(events) => setEvents(events)}>{room['id']}</Calendar>
                <EventsTable day={currentDay} events={events} handleAddEvent={() => {setEventPopupOpen(true);}}></EventsTable>
                {eventPopupOpen && <EventPopup  handleClose={() => {setEventPopupOpen(false);}} roomId={id}>{currentDay}</EventPopup>}
            </div>
          </>
          }
        </>
    );
}
