import React from 'react'
import Navbar from '../common/navabar'
import HeroSection from './herosection'
import Error from '../common/errorpage'
import Footer from './footer'
import { Button } from "../components/ui/button"
import Rating from "./rating"
import Timeline from "./Timeline"


const home = () => {
  return (
    <div>
        <Navbar />
        <Button>Hello Everyone</Button>
        <HeroSection />
        <Error />
        <Rating/>
        <Timeline/>
      
        <Footer />
       
          
    </div>
  )
}

export default home