import { useEffect, useState, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import MouseStalker from './components/MouseStalker'
import IntroSequence from './components/IntroSequence'
import { useCursorReaction } from './hooks/useCursorReaction'

function ScrollHandler() {
  const { pathname, hash } = useLocation()
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      // Always pin to top on initial page load / refresh
      window.scrollTo(0, 0)
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname)
      }
      return
    }

    if (hash) {
      const targetId = hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 90)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname, hash])

  return null
}

function App() {
  const location = useLocation()
  useCursorReaction()
  const [showIntro, setShowIntro] = useState(() => {
    // Check if intro has already run in this session
    return !sessionStorage.getItem('interviewly_intro_seen')
  })

  useEffect(() => {
    const handleReplay = () => {
      sessionStorage.removeItem('interviewly_intro_seen')
      setShowIntro(true)
    }

    window.addEventListener('replay-intro', handleReplay)
    return () => window.removeEventListener('replay-intro', handleReplay)
  }, [])

  return (
    <>
      {/* Permanent Fixed Titanium Beam Background */}
      <div className="sen-fixed-bg" aria-hidden="true" />

      {/* Custom Magnetic Cursor */}
      <MouseStalker />

      {/* Sen Knife-inspired Opening Intro Sequence */}
      {showIntro && (
        <IntroSequence onComplete={() => setShowIntro(false)} />
      )}

      <ScrollHandler />
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <div key={location.pathname} className="page-transition-wrap" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
