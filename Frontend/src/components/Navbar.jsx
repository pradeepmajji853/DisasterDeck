import "./Navbar.css";
import { NavLink } from 'react-router-dom';

export default function Navbar() {

  return (
    <div className="Navbar">
      <h1>Disaster Deck</h1>
      <ul>
        <li>
          <NavLink 
            to="/Home" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/resources" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Resources
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/community-forum" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Community Forum
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/preparedness-checklist" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Preparedness Checklist
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

