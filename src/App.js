import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import { Route, Routes, } from 'react-router-dom'
import { Link } from 'react-router-dom';

// We will create these two pages in a moment
import { RoomList } from "./components/RoomList.js"
import { RoomPage } from "./components/RoomPage.js"
import { BrowserRouter } from 'react-router-dom'
import { MainPage } from './components/MainPage.js'
import { Login } from './components/Login/Login.js'
import { Register } from './components/Login/Register.js'
import { Logout } from './components/Login/Logout.js'
import { Navbar } from './components/Navbar.js';
import { Profile } from './components/Profile.js';
import { EditEvent } from './components/EditEvent.js';

export default function App() {
  const [currentUser, setCurrentUser] = useState();
  
  const fetchUserData = () => {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      redirect: 'follow'
    }
      
    fetch("http://127.0.0.1:5000/user", requestOptions)
    .then(response => response.json())
    .then(response => setCurrentUser(response['firstName']))
    .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar currentUser={currentUser}/>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route exact path='rooms' element={<RoomList />} />
          <Route path='room/:id' element={<RoomPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/profile' element={<Profile>{currentUser}</Profile>} />
          <Route path='/event/:id' element={<EditEvent />}/>
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}