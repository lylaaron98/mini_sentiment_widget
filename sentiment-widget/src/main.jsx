// Main entry point for the React application
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Create and render the React root component
// React.StrictMode helps identify potential problems in the application during development
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
