import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import './RoomPage.css'

export function RoomPage() {
    const { id } = useParams();
    const [room, setRoom] = useState()

    const fetchRoomData = () => {
        var requestOptions = {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          },
          edirect: 'follow'
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
            <div>
                <h1>ROOM NUMBER {room['name']}</h1>
                <div className="descritpionDiv">
                    <h4>Description</h4>
                    <p>{room['description']}</p>
                    <p>Capacity: {room['capacity']}</p>
                    <p>Air conditioning {room['conditioning'] ? <b className="green">&#x2713;</b> : <b className="red">&#x2717;</b>}</p>
                    <p>Wi-Fi {room['wifi'] ? <b className="green">&#x2713;</b> : <b className="red">&#x2717;</b>}</p>
                    <p>Ethernet {room['ethernet'] ? <b className="green">&#x2713;</b> : <b className="red">&#x2717;</b>}</p>
                    <p>Projector  {room['projector'] ? <b className="green">&#x2713;</b> : <b className="red">&#x2717;</b>}</p>
                    <p>TV {room['tv'] ? <b className="green">&#x2713;</b> : <b className="red">&#x2717;</b>}</p>
                    <p>Whiteboard {room['whiteboard'] ? <b className="green">&#x2713;</b> : <b className="red">&#x2717;</b>}</p>
                </div>
            </div>
          </>
          }
        </>
    )
}