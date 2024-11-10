import Navbar from './components/Navbar';
import ProfileInfo from './components/profile_view/ProfileInfo';
import PublicRepos from './components/profile_view/public_repos';
import Sidebar from './components/profile_view/Sidebar';
import { Link } from 'react-router-dom';
import './index.css';

function ProfileView(){
    return <div>
      <Navbar />
      <div className="profile-view">
        <div style={{padding: "1em",  borderRadius: "10px", height: "100%"}} className="sidebar"> <Sidebar /> </div>
        <div style={{padding: "1em",  borderRadius: "10px"}} className="profile-info"> <ProfileInfo /> </div>
        <div style={{padding: "1em",  borderRadius: "10px"}} className="public-repos-list"> <PublicRepos /> </div>
      </div>
      {/* <Sidebar />
      <ProfileInfo />
      <PublicRepos /> */}
    </div>;
};

export default ProfileView;