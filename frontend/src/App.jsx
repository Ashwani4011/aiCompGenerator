import { useState } from 'react'
import './App.css'
import Home from "./Pages/Home"
import Login from "./Pages/Login"; // adjust path if needed
import Signup from "./Pages/Signup";  // your home component
import NoPage from "./Pages/NoPage"
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  

  return (
    <>
     
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='*' element={<NoPage/>} />
        
      </Routes>
      </BrowserRouter>
       
    </>
  )
}

export default App
