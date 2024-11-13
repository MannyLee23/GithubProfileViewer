
function GithubSSO(){
    return (
        <div className="login-box">  
        <form action="profile.html" method="POST">
            <div className="textbox">
                <a href="https://github.com/login/oauth/authorize?client_id=Ov23liERDJ2r1uEBfRAT&redirect_uri=http://localhost:5173/callback&scope=user:email">
                    <button className="btn" type="button">Login with GitHub</button>
                </a>
            </div>            
        </form>
    </div>
    );
};

export default GithubSSO;