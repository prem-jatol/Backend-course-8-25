import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import JwtToken from './JwtToken.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <JwtToken />
  </StrictMode>,
)
