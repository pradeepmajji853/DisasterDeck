import "./Navbar.css";
import { NavLink } from 'react-router-dom';

export default function Navbar() {

  return (
    <div className="Navbar">
        <h1>Disaster Deck</h1>
      <ul>
        <li>
          <NavLink to="/Home" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/resources" activeClassName="active">Resources</NavLink>
        </li>
        <li>
          <NavLink to="/community-forum" activeClassName="active">Community Forum</NavLink>
        </li>
        <li>
          <NavLink to="/preparedness-checklist" activeClassName="active">Preparedness Checklist</NavLink>
        </li>
      </ul>
    </div>
  );
}
