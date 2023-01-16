import { Link, useLocation } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useState, useEffect } from 'react';
import "../App.css";

const Navbar = () => {
    const [expandNavbar, setExpandNavbar] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setExpandNavbar(false);
    }, [location]);

  return (
    <div className='navbar' id={expandNavbar ? 'open' : 'close'}>
        <div className='toggleButton'>
            <button onClick={() => setExpandNavbar(!expandNavbar)}>
                <ReorderIcon />
            </button>
        </div>

        {/* Links */}
        <div className='links'>
            <Link to="/">Home</Link>
            <Link to="/Projects">Projects</Link>
            <Link to="/LifeTimeline">My Life</Link>
        </div>
    </div>
  )
}

export default Navbar