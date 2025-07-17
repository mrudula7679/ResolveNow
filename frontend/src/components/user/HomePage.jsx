import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC';
import Complaint from '../user/Complaint';
import Status from '../user/Status';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('Complaint');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setUserName(user.name);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  }, [navigate]);

  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      {/* Custom Navbar with Cream Palette */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: '#fdf6e3', // light beige
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <div className="container-fluid">
          <h1 className="navbar-brand" style={{ color: '#5c4033' }}>
            Hi, {userName}
          </h1>
          <div className="navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    activeComponent === 'Complaint' ? 'fw-bold' : ''
                  }`}
                  style={{
                    color: activeComponent === 'Complaint' ? '#d2b48c' : '#5c4033',
                  }}
                  onClick={() => handleNavLinkClick('Complaint')}
                >
                  Complaint Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    activeComponent === 'Status' ? 'fw-bold' : ''
                  }`}
                  style={{
                    color: activeComponent === 'Status' ? '#d2b48c' : '#5c4033',
                  }}
                  onClick={() => handleNavLinkClick('Status')}
                >
                  Status
                </NavLink>
              </li>
            </ul>
          </div>
          <button
            className="btn"
            onClick={Logout}
            style={{
              backgroundColor: '#d2b48c',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
            }}
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Page Content Area */}
      <div
        className="container my-4"
        style={{
          backgroundColor: '#fffaf0',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 8px rgba(0,0,0,0.05)',
        }}
      >
        {activeComponent === 'Complaint' && <Complaint />}
        {activeComponent === 'Status' && <Status />}
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
