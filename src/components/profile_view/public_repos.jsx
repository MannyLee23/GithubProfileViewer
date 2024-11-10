import '../../index.css';

function PublicRepos() {
    return (
        <div className="public-repos">
            <ul aria-label="Public Repositories" className="public-repos-list">
                <li style={{flexDirection: "row", display: "flex", justifyContent: "space-between"}}>
                    <h2>Public Repositories</h2>
                    <input type="text" placeholder="Search..." aria-label="Search Repositories" />
                    <button>Filter By</button>
                </li>
                <section className='public-repos-list-item'>
                    <li>
                        <h3>Project 1</h3>
                        <button>Share</button>
                        <button>Like</button>
                    </li>
                    <li>
                        <h3>Project 2</h3>
                        <button>Share</button>
                        <button>Like</button>
                    </li>
                    <li>
                        <h3>Project 3</h3>
                        <button>Share</button>
                        <button>Like</button>
                    </li>
                    <li>
                        <h3>Project 4</h3>
                        <button>Share</button>
                        <button>Like</button>
                    </li>
                    <li>
                        <h3>Project 5</h3>
                        <button>Share</button>
                        <button>Like</button>
                    </li>
                    <li>
                        <h3>Project 6</h3>
                        <button>Share</button>
                        <button>Like</button>
                    </li>
                </section>
            </ul>
        </div>
    );
};

export default PublicRepos;