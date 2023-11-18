import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = e => {
      const { clientX, clientY } = e
      setPosition({ x: clientX, y: clientY })
    }
    enabled && window.addEventListener('pointermove', handleMove)

   return ( ) => {
    window.removeEventListener('pointermove', handleMove)
   } 
  }, [enabled])

  const handleClick = () => {
    setEnabled(!enabled)
  }

  return (
    <>
      <h3>Mouse follower</h3>
      <div className="ball" style={{transform: ` translate(${position.x}px, ${position.y}px)`}}></div>
      <button onClick={handleClick}>{enabled ? 'Disabled' : 'Activate'}</button>
    </>
  )
}

export default App
