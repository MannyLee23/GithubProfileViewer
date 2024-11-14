import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import App from './App.jsx'
import ProfileView from './ProfileView.jsx'
import GithubSSO from './components/GithubSSO.jsx'
import MessageForm from './MessageForm.jsx'

createRoot(document.getElementById('root')).render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile/:username" element={<ProfileView />} />
        <Route path="/GithubSSO" element={<GithubSSO />} />
     </Routes>
    </Router>
)
