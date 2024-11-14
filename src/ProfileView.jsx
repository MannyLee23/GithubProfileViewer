import Navbar from './components/Navbar';
import './index.css';
import React , { useEffect, useState } from 'react';
import { Octokit } from "@octokit/rest";
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import MessageForm from './MessageForm';

const octokit = new Octokit();


function ProfileView(){

  // const [rerender, setRerender] = useState(false);
  // const [userData, setUserData] = useState({});

  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddFriendPopup, setShowAddFriendPopup] = useState(false);
  const [showMessageFormPopup, setShowMessageFormPopup] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data } = await octokit.users.getByUsername({ username });
        setUserData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleAddFriendClick = () => {
    setShowAddFriendPopup(true);
  };

  const handleClosePopup = () => {
    setShowAddFriendPopup(false);
  };

  const handleAddFriend = (friend) => {
    setFriends([...friends, friend]);
    setShowAddFriendPopup(false);
  };

  const handleMessageIconClick = () => {
    setShowMessageFormPopup(true);
  };

  const handleCloseMessageFormPopup = () => {
    setShowMessageFormPopup(false);
  };

    return <div>
      <Navbar />
      <div className="profile-view">
        <div style={{padding: "1em",  borderRadius: "10px", height: "100%"}} className="sidebar"> <Sidebar userData={userData} 
          onAddFriendClick={handleAddFriendClick } onMessageIconClick={handleMessageIconClick}/> </div>
        <div style={{padding: "1em",  borderRadius: "10px"}} className="profile-info"> <ProfileInfo /> </div>
        <div style={{padding: "1em",  borderRadius: "10px"}} className="public-repos-list"> <PublicRepos username={username}/> </div>
        {/* <div style={{ padding: "1em", borderRadius: "10px" }} className="message-form"><MessageForm recipientEmail={userData.email} /> </div> */}
      </div>
      {showAddFriendPopup && <AddFriendPopup onClose={handleClosePopup} />}
      {showMessageFormPopup && <MessageFormPopup recipientEmail={userData.email} onClose={handleCloseMessageFormPopup} />}
    </div>;
};


  return (
      <div className="sidebar">
      <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
      <h3>{userData.name}</h3>
      <h4>@{userData.login}</h4>
      <div class="msg-add-icons">
          <button onClick={onMessageIconClick}>Message</button>
          <button onClick={onAddFriendClick}>Add Friend</button>
      </div>
      <ul aria-label="Quandale's Friends" class="profile-friends">
          <li>
              <img src="images/bitmoji.png"></img>
              <p>@speed</p>
          </li>
          <li>
              <img src="images/bitmoji.png"></img>
              <p>@speed</p>
          </li>
          <li>
              <img src="images/bitmoji.png"></img>
              <p>@speed</p>
          </li>
          <li>
              <img src="images/bitmoji.png"></img>
              <p>@speed</p>
          </li>
          <li>
              <img src="images/bitmoji.png"></img>
              <p>@speed</p>
          </li>
          
      </ul>
  </div>
  );
};

function AddFriendPopup({ onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add Friend</h2>
        <p>Do you want to add this user as a friend?</p>
        <button onClick={onClose}>Close</button>
        <button onClick={() => { /* Add friend logic here */ }}>Add Friend</button>
      </div>
    </div>
  );
};

function MessageFormPopup({ recipientEmail, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Send Message</h2>
        <MessageForm recipientEmail={recipientEmail} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

function SharePopup({ repoName, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Share {repoName}</h2>
        <p>Choose a friend to share this repository with:</p>
        <ul>
          {/* Replace with dynamic friend list */}
          <li><button onClick={() => { /* Share logic here */ }}>Friend 1</button></li>
          <li><button onClick={() => { /* Share logic here */ }}>Friend 2</button></li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

function ProfileInfo() {
    return (
        <div className="profile-info"> <h1 style={{background: "rgb(223,220,240)", 
            background: "linear-gradient(90deg, rgba(223,220,240,1) 0%, rgba(118,102,162,1) 100%)", 
            border: "1px solid black", padding: "10%", width: "180%", textAlign: "center", paddingTop: "4%", paddingBottom: "4%"}}>Profile Information</h1> </div>
    );
};

function PublicRepos({ username}) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const { data } = await octokit.repos.listForUser({ username });
        setRepos(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [username]);

  const handleShareClick = (repo) => {
    setSelectedRepo(repo);
    setShowSharePopup(true);
  };

  const handleCloseSharePopup = () => {
    setShowSharePopup(false);
    setSelectedRepo(null);
  };

  const handleLikeClick = (event) => {
    event.target.classList.toggle('liked');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
   <div>
      <h2>Public Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} className="public-repos-list-item">
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              View Repository
            </a>
            <button onClick={() => handleShareClick(repo)}>Share</button>
            <button onClick={handleLikeClick}>Like</button>
          </li>
        ))}
      </ul>
      {showSharePopup && <SharePopup repoName={selectedRepo.name} onClose={handleCloseSharePopup} />}
    </div>
  );
};

export default ProfileView;