import './App.css'
import {Button} from "../src/components/ui/button"
import Navbar from './components/ui/navabar'
import HeroSection from './sections/herosection'
import Footer from './sections/footer'
import Error from './components/ui/errorpage'

function App() {
  

  return (
    <>
    <Navbar/>
   <Button>Hello EveryOne</Button> 
   <HeroSection/>
   <Error/>
   <Footer/>
     
    </>
  )
}

export default App
