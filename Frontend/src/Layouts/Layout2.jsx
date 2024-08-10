import React from 'react';
import Navbar from '../components/Navbar.jsx'; 

const Layout2 = ({ children }) => {
  return (
    <div>
      <Navbar/>
        {children}
    </div>
  );
};

export default Layout2;
