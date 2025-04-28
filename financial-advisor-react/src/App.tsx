import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Testimonials from './components/Testimonials'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <main className="content-container">
        <Services />
        <About />
        <Testimonials />
      </main>
    </div>
  )
}

export default App
