import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { syncService } from './services/syncService'
import { registerSW } from 'virtual:pwa-register'

// Initialize offline sync
syncService.init();

// Register PWA service worker
registerSW({ immediate: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
