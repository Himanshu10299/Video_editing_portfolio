import './App.css'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import Services from './components/Services'
// import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <div className="app">
      <Navbar videoOpen={videoOpen} />
      <Hero />
      <Work onVideoOpen={() => setVideoOpen(true)} onVideoClose={() => setVideoOpen(false)} />
      <Services />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </div>
  )
}

export default App
