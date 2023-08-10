import React from 'react'
import { Route, Routes,  } from 'react-router-dom'

// We will create these two pages in a moment
import  {RoomList} from "./components/RoomList.js"
import  {RoomPage} from "./components/RoomPage.js"
import {BrowserRouter} from 'react-router-dom'
import { MainPage } from './components/MainPage.js'
import { Login } from './components/Login/Login.js'
import { Register } from './components/Login/Register.js'

export default function App() {
  return (
    <>
      <h1 style={{textAlign: "center"}}>
        <a href="/">Reservation system</a>
      </h1>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<MainPage/>}/>
          <Route exact path='rooms' element={<RoomList/>} />
          <Route path='room/:id' element={<RoomPage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}