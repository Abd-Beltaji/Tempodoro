import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Alert from './Alert'


ReactDOM.render(
  <React.StrictMode>
    <App />
    <Alert alertMode="error" />
  </React.StrictMode>,
  document.getElementById('root')
)
