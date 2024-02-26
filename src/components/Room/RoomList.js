import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { fetchRoomsData } from '../../functions/ApiUtils';


/**
 * Renders a list of rooms and allows the user to choose a room from the list.
 * @returns {JSX.Element} The rendered RoomList component.
 */
export function RoomList() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    fetchRoomsData(setRooms)
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
