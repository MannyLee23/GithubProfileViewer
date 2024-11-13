import React , { useEffect, useState } from 'react';
import { fetchGithubUsername } from '../utils';
``
function Navbar() {
    const [username, setUsername] = useState(null);
  
    useEffect(() => {
      async function getUsername() {
        const username = await fetchGithubUsername();
        setUsername(username);
      }
  
      getUsername();
    }, []);
  
    return (
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <a style={{ color: 'white' }} className="navbar-brand" href="/"><strong>Home</strong></a>
          <div className="navbar-text" style={{ color: 'white' }}>
            {username ? `Welcome, ${username}` : <a href="/GithubSSO" style={{ color: 'white' }}>Login</a>}
          </div>
        </div>
      </nav>
    );
  };

export default Navbar;