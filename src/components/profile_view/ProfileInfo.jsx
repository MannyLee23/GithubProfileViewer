import '../../index.css';
import bitmoji from '../../assets/bitmoji.png'; 

function ProfileInfo() {
    return (
<<<<<<< HEAD
        <div className="profile-info"> <h1>
                Profile Information</h1> </div>
=======
        <div className="profile-info">
            <h1 style={{
                background: "linear-gradient(90deg, rgba(223,220,240,1) 0%, rgba(118,102,162,1) 100%)", 
                border: "1px solid black", 
                padding: "10%", 
                width: "180%", 
                textAlign: "center", 
                paddingTop: "4%", 
                paddingBottom: "4%"
            }}>
                Profile Information
            </h1>
            
            {/* Image Element */}
            <img 
                src={bitmoji} 
                alt="User Bitmoji" 
                style={{ 
                    width: '150px', 
                    height: '150px', 
                    borderRadius: '50%', 
                    marginTop: '20px' 
                }} 
            />
        </div>
>>>>>>> 214f94ab55d49aac4ab475cbbf4009d6a27f5944
    );
}

export default ProfileInfo;
