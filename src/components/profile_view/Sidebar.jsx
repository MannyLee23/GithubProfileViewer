import '../../index.css';

function Sidebar() {
    return (
        <div className="sidebar">
        <img src="../../assets/bitmoji.png"></img>
        <div style={{height: '40%'}}></div>
        <h2>Quandale Dingle</h2>
        <h3>@quandale_dingle100</h3>
        <div class="msg-add-icons">
            <img src="images/msg.webp"></img>
            <img src="images/add.png"></img>
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

export default Sidebar;