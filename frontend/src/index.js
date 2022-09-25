import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import AlertStates from './context/AlertStates'

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<AlertStates><App /></AlertStates>)