import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App'

const container = document.getElementById('app')!
const root = createRoot(container)
root.render(<App />)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
