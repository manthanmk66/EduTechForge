import './App.css'

import Login from './sections/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './sections/home'

function App() {
  return (

    <div>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
