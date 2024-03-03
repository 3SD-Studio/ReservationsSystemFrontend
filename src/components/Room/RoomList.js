import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { fetchRoomsData } from '../../functions/ApiUtils';

import "./RoomList.css"

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
        <div className="roomTiles">
          {rooms.map((room) => (
            <div key={room.id} className="roomTile">
              <Link to={`/room/${room.id}`} className="roomLink">
                <h2>{room.name}</h2>
                <p>Capacity: {room.capacity}</p>
                <p>Description: {room.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
  );
}
