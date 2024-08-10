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
            to="/Emergency" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Emergency
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/KnowledgeHub" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            KnowledgeHub
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
        <li>
          <NavLink 
            to="/Dos" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Do's and Dont's
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

