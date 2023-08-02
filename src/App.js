import './App.css';
import React, {useEffect, useState} from 'react';

function App() {
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
    <div className="App">
      <ul>
        {rooms.map((room) => {
          return <li>{JSON.stringify(room)}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
