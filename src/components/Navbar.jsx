import React from 'react';
``
function Navbar(){
    return (
        <nav className="navbar bg-dark">
            <div className="container-fluid">
                <a style={{color: 'white'}}className="navbar-brand" href="/"><strong>Home</strong></a>
            </div>
        </nav>
    );
};

export default Navbar;