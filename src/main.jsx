import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import App from './App.jsx'
import ProfileView from './ProfileView.jsx'
import GithubSSO from './components/GithubSSO.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/GithubSSO" element={<GithubSSO />} />
     </Routes>
    </Router>
  </StrictMode>,
)
