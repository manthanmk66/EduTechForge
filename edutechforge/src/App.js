import './App.css'

import Login from './sections/login'
import Signup from "./sections/signup"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './sections/home'
import Rating from "./sections/rating"

function App() {
  return (

    <div>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/rating" element={<Rating/>}/>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
