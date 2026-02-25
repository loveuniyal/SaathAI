import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Schemes from './pages/Schemes'
import Health from './pages/Health'
import Legal from './pages/Legal'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/health" element={<Health />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App