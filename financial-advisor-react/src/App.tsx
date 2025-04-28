import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <main className="content-container">
        <Services />
      </main>
    </div>
  )
}

export default App
