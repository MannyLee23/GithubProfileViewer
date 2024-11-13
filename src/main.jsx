import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import App from './App.jsx'
import ProfileView from './ProfileView.jsx'
import GithubSSO from './components/GithubSSO.jsx'


function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the auth_token cookie is present
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      acc[name] = value;
      return acc;
    }, {});
    console.log('Cookies:', cookies); // Debugging line
    setIsAuthenticated(!!cookies['auth_token']);
  }, []);

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to /'); // Debugging line
    return <Navigate to="/" />;
  }

  return children;
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<App />} />
  //       <Route path="/profile" element={
  //         <ProtectedRoute>
  //           <ProfileView />
  //         </ProtectedRoute>
  //       } />
  //       <Route path="/GithubSSO" element={<GithubSSO />} />
  //     </Routes>
  //   </Router>
  // </StrictMode>,

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
