import './App.css'

import Login from './sections/login'
import Signup from "./sections/signup"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './sections/home'

function App() {
  return (

    <div>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
