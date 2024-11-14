import React , { useEffect, useState } from 'react';

const CLIENT_ID = 'Ov23liERDJ2r1uEBfRAT';
const CLIENT_SECRET = 'af677611c7c72b669d7a71e55bb78c010ba8884d';

function Navbar() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');
    console.log(codeParam);

    //Local storage
    if(codeParam && (localStorage.getItem('access_token') === null)){
      async function getAccessToken() {
        await fetch('http://localhost:5175/getAccessToken?code=' + codeParam, {
          method: 'GET'
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);
          if(data.access_token){
            localStorage.setItem('accessToken', data.access_token);
            setRerender(!rerender);
          }
        })
      }
      getAccessToken();
    }

  }, []);

  async function getUserData(){
    await fetch('http://localhost:5175/getUserData', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      setUserData(data);
    })

  }

  function login(){
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" +  CLIENT_ID);
  }
  
    useEffect(() => {
      if (localStorage.getItem('accessToken')) {
        getUserData();
      }
    }, [rerender]);

    return (
      <nav className="navbar bg-dark">
      <div className="container-fluid">
        <a style={{ color: 'white' }} className="navbar-brand" href="/"><strong>Home</strong></a>
        <div className="navbar-text" style={{ color: 'white' }}>
        {localStorage.getItem('accessToken') ?
        <>
        <button onClick={() => { localStorage.removeItem('accessToken'); setRerender(!rerender); }}>
          Logout {Object.keys(userData).length !== 0 ? `(${userData.login})` : ''}
        </button>
        </>
        :
        <>
        <button onClick={login}>Login</button>
        </>
        }
        </div>
      </div>
      </nav>
    );
  };

export default Navbar;