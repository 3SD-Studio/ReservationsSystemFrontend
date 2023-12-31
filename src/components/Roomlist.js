import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

export function RoomList() {
  const[rooms, setRooms] = useState([])

  const fetchRoomsData = () => {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    }
    
    fetch("http://127.0.0.1:5000/rooms", requestOptions)
    .then(response => response.json())
    .then(response => setRooms(response))
    .catch(error => console.log('error', error))
  }
  
  useEffect(() => {
    fetchRoomsData()
  }, [])

  
  return (
    <div className="RoomsListDiv">
      <h1>Choose room from list:</h1>
      <ul aria-label="Choose room from list:">
        {rooms.map((room) => {
          return <li><Link to={'/room/' + room['id']}>{room['name']}</Link></li>
        })}
      </ul>
    </div>
  );
}
