import React from 'react'
import Navbar from '../common/navabar'
import HeroSection from './herosection'
import Error from '../common/errorpage'
import Footer from './footer'
import { Button } from "../components/ui/button"
import Rating from "./rating"
import Timeline from "./Home/Timeline"
import LearningCards from "../sections/Home/Learningcards"
import Instructor from "./Home/InstructorSection"
import ExploreMore from './Home/Exploremore'
import FullCatalog from './Home/Fullcatelog'


const home = () => {
  return (
    <div className='space-y-20' >
        <Navbar />
        <Button>Hello Everyone</Button>
        <HeroSection />
        <FullCatalog/>
        <ExploreMore/>
        <Error />
        <Rating/>
       
        <Timeline/>
        <LearningCards/>
       
        <Instructor/>
      
        <Footer />
       
          
    </div>
  )
}

export default home