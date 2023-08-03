import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Calendar } from "./Calendar";

import './RoomPage.css'

const symbol = (bool) => {
    if (bool) {
        return <b className="green">&#x2713;</b>
    } else {
        return <b className="red">&#x2717;</b>
    }
} 

export function RoomPage() {
    const { id } = useParams();
    const [room, setRoom] = useState()

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
      .catch(error => console.log('error', error))
    }
      
    useEffect(() => {
      fetchRoomData()
    }, [])
    

    return (
        <>
          {room === undefined ? 
          <h1>LOADING</h1> : 
          <>
            <h1>ROOM NUMBER {room['name']}</h1>
            <div style={{display: "flex"}}>  
                <div className="descritpionDiv">
                    <h4>Description</h4>
                    <p>{room['description']}</p>
                    <p>Capacity: {room['capacity']}</p>
                    <p>Air conditioning {symbol(room['conditioning'])}</p>
                    <p>Wi-Fi {symbol(room['wifi'])}</p>
                    <p>Ethernet {symbol(room['ethernet'])}</p>
                    <p>Projector  {symbol(room['projector'])}</p>
                    <p>TV {symbol(room['tv'])}</p>
                    <p>Whiteboard {symbol(room['whiteboard'])}</p>
                </div>
                <Calendar>{room['id']}</Calendar>
            </div>
          </>
          }
        </>
    )
}