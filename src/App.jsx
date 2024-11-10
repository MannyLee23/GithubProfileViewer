
import IndexMessage from './components/IndexMessage';
import Navbar from './components/Navbar';
import { Link } from 'react-router-dom';

function App(){
  return <div>
    <Navbar />
    <IndexMessage />
    <Link to="/profile">Go to profile</Link>
  </div>;
};

export default App;