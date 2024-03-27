import React from 'react'
import Navbar from '../common/navabar'
import HeroSection from './herosection'
import Error from '../common/errorpage'
import Footer from './footer'
import { Button } from "../components/ui/button"

const home = () => {
  return (
    <div>
        <Navbar />
        <Button>Hello Everyone</Button>
        <HeroSection />
        <Error />
        <Footer />
       
          
    </div>
  )
}

export default home