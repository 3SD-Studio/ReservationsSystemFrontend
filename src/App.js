import React from 'react'
import { Route, Routes } from 'react-router-dom'
// We will create these two pages in a moment
import  {Roomlist} from "./components/Roomlist.js"
import {BrowserRouter} from 'react-router-dom'
import { MainPage } from './components/MainPage.js'

export default function App() {
  return (
    <>
      <h1 style={{textAlign: "center"}}>
        Reservation system
      </h1>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<MainPage/>}/>
          <Route exact path='rooms' element={<Roomlist/>} />
        </Routes>
      </BrowserRouter>
      
    </>
    
  )
}