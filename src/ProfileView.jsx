import Navbar from './components/Navbar';
import './index.css';
import React, { useEffect, useState } from 'react';
import { Octokit } from "@octokit/rest";
import { useParams } from 'react-router-dom';
import '@mui/material';
import MessageForm from './MessageForm';

const octokit = new Octokit();

function ProfileView() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddFriendPopup, setShowAddFriendPopup] = useState(false);
  const [showMessageFormPopup, setShowMessageFormPopup] = useState(false);
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [showSharePopup, setShowSharePopup] = useState(false);

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

  const handleCloseAddFriendPopup = () => {
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
    if (event.target.classList.contains('liked')) {
      event.target.style.backgroundColor = 'pink';
    } else {
      event.target.style.backgroundColor = '';
    }
  };



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Navbar />
      <div className='profile-view'>
        <div className="sidebar">
          <Sidebar userData={userData} friends={friends} onAddFriendClick={handleAddFriendClick} onMessageIconClick={handleMessageIconClick} />
        </div>
        <div className="profile-info">
          <ProfileInfo />
        </div>
        <div className="public-repos-list">
          <PublicRepos username={username} onShareClick={handleShareClick}/>
        </div>
      </div>
      {showAddFriendPopup && userData && <AddFriendPopup userData={userData} onClose={handleCloseAddFriendPopup} onAddFriend={handleAddFriend} />}
      {showMessageFormPopup && <MessageFormPopup recipientEmail={userData.email} onClose={handleCloseMessageFormPopup} />}
      {showSharePopup &&  <SharePopup repoName={selectedRepo.name} onClose={handleCloseSharePopup} />}
    </div>
  );
}

function Sidebar({ userData, friends, onAddFriendClick, onMessageIconClick }) {
  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="sidebar">
      <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
      <h3>{userData.name}</h3>
      <h4>@{userData.login}</h4>
      <div className="msg-add-icons">
        <button onClick={onMessageIconClick}>Message</button>
        <button onClick={onAddFriendClick}>Add Friend</button>
      </div>
      <ul aria-label="Friends" className="profile-friends">
        {friends.map((friend, index) => (
          <li key={index}>
            <img src={friend.avatar_url} alt={`${friend.login}'s avatar`} />
            <p>@{friend.login}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddFriendPopup({ userData, onClose, onAddFriend }) {
  const [friendUsername, setFriendUsername] = useState('');

  const handleAddFriendClick = async () => {
    try {
      const { data } = await octokit.users.getByUsername({ username: friendUsername });
      onAddFriend(data);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <input
          type="text"
          placeholder="Enter friend's username"
          value={friendUsername}
          onChange={(e) => setFriendUsername(e.target.value)}
        />
        <button onClick={onClose}>Close</button>
        <button onClick={handleAddFriendClick}>Add Friend</button>
      </div>
    </div>
  );
}

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
}

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
}

function ProfileInfo() {
  return (
    <div className="profile-info">
      <h1>Profile Information</h1>
    </div>
  );
}

function PublicRepos({ username, onShareClick }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchRepos() {
      try {
        const { data } = await octokit.repos.listForUser({ username, per_page: 100 });
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

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );g

  return (
    <div>
      <h2>Public Repositories</h2>
      <ul className='list-group'>
        {filteredRepos.map((repo) => (
            <li key={repo.id} className="list-group-item list-group-item-dark">
              <h4 style={{ flex: 1 }}><a className="icon-link" href={repo.html_url} target="_blank" rel="noopener noreferrer"> {repo.name} </a></h4>
              <div className="repo-buttons">
                <button className="btn btn-light" onClick={()=>handleShareClick(repo)}>Share</button>
                <button className="btn btn-light" onClick={()=>handleLikeClick}>Like</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ProfileView;