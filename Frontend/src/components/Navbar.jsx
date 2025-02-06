import "./Navbar.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth, useClerk } from "@clerk/clerk-react";

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/sign-in');
  };

  return (
    <nav className="Navbar">
      <div className="nav-container">
        <h1>Disaster Deck</h1>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-home"></i> Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-info-circle"></i> About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/Dos" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-list-ul"></i> Do's and Don'ts
            </NavLink>
          </li>
          {isSignedIn && (
            <li>
              <button 
                onClick={handleSignOut}
                className="logout-button"
              >
                <i className="fas fa-sign-out-alt"></i>
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

