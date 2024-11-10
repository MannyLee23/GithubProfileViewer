
function IndexMessage(){
    return (
        <div className="home-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="h2-main">Github Profile Viewer</h2>
            <h1 className="h1-main">A simpler way to show your Github profile and repositories.</h1>
            <br />
            <div class="input-group mb-3" style={{ maxWidth: '40%' }}>
                <input type="text" class="form-control" placeholder="Enter Github username..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onClick={() => window.location.href = `/profile/${document.querySelector('.form-control').value}`}>Search</button> </div>
            </div>
        </div>
    );
};

export default IndexMessage;