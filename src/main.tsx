import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeAnalytics } from './analytics.ts'
import './index.css'
import App from './App.tsx'

initializeAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
