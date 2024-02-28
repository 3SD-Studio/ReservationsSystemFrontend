import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import { Route, Routes, } from 'react-router-dom'
import { RoomList } from "./components/Room/RoomList.js"
import { RoomPage } from "./components/Room/RoomPage.js"
import { BrowserRouter } from 'react-router-dom'
import { MainPage } from './components/MainPage.js'
import { Login } from './components/Login/Login.js'
import { Register } from './components/Login/Register.js'
import { Logout } from './components/Login/Logout.js'
import { Navbar } from './components/Navbar/Navbar.js';
import { Profile } from './components/Profile/Profile.js';
import { EventPage } from './components/Event/EventPage.js';
import { fetchCurrenUser } from './functions/ApiUtils.js'

export default function App() {
  const [currentUser, setCurrentUser] = useState();
  
  useEffect(() => {
    fetchCurrenUser(setCurrentUser)
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
          <Route path='/event/:id' element={<EventPage />}/>
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}