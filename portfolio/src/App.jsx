import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Work />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
