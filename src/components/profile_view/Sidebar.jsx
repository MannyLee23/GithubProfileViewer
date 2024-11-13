import '../../index.css';
import bitmoji from '../../assets/bitmoji.png'; // Import the image
import msgIcon from '../../assets/msg.webp'; // Import the msg icon image
import addIcon from '../../assets/add.png'; // Import the add icon image

function Sidebar() {
    return (
        <div className="sidebar">
            {/* Profile Image */}
            <img src={bitmoji} alt="User Bitmoji" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            
            <div style={{height: '40%'}}></div>
            <h2>Quandale Dingle</h2>
            <h3>@quandale_dingle100</h3>
            
            {/* Message and Add Icons */}
            <div className="msg-add-icons">
                <img src={msgIcon} alt="Message Icon" style={{ width: '30px', height: '30px' }} />
                <img src={addIcon} alt="Add Icon" style={{ width: '30px', height: '30px' }} />
            </div>

            {/* Friends List */}
            <ul aria-label="Quandale's Friends" className="profile-friends">
                <li>
                    <img src={bitmoji} alt="Friend Bitmoji" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                    <p>@speed</p>
                </li>
                <li>
                    <img src={bitmoji} alt="Friend Bitmoji" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                    <p>@speed</p>
                </li>
                <li>
                    <img src={bitmoji} alt="Friend Bitmoji" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                    <p>@speed</p>
                </li>
                <li>
                    <img src={bitmoji} alt="Friend Bitmoji" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                    <p>@speed</p>
                </li>
                <li>
                    <img src={bitmoji} alt="Friend Bitmoji" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                    <p>@speed</p>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
