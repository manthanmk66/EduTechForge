import React from 'react'
import Navbar from '@/components/ui/navabar'
import HeroSection from './herosection'
import Error from '@/components/ui/errorpage'
import Footer from './footer'
import { Button } from '@/components/ui/button'

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