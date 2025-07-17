import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image1 from '../../Images/Image1.png'; // Make sure the image is placed correctly
import Footer from './FooterC';

const Home = () => {
  return (
    <>
      <Navbar style={{ backgroundColor: '#f5f5dc' }} variant="light" expand="lg">
        <Container>
          <Navbar.Brand style={{ color: '#5c4033' }}>IssueTracker</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" style={{ color: '#5c4033' }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/signup" style={{ color: '#5c4033' }}>
              Sign Up
            </Nav.Link>
            <Nav.Link as={Link} to="/login" style={{ color: '#5c4033' }}>
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container
        className="home-container d-flex align-items-center justify-content-between py-5"
        style={{
          backgroundColor: '#fffdd0', // Match background
          minHeight: '80vh',
          color: '#333',
          flexWrap: 'wrap', // Responsive wrap
        }}
      >
        <div className="left-side" style={{ flex: '1 1 300px', textAlign: 'center' }}>
          <img
            src={Image1}
            alt="Welcome Visual"
            style={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: '#fffdd0', // Match background to remove checkerboard look
              padding: '10px',
              borderRadius: '10px',
              objectFit: 'cover',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>

        <div className="right-side ms-4" style={{ flex: '1 1 300px' }}>
          <p>
            <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              Empower Your Team,
            </span>
            <br />
            <span style={{ fontSize: '1.2rem' }}>
              Exceed Customer Expectations: Discover our
            </span>
            <br />
            <span style={{ fontSize: '1.2rem' }}>
              Complaint Management Solution
            </span>
            <br />
            <Link to="/Login">
              <Button className="mt-3" variant="outline-dark">
                Register your Complaint
              </Button>
            </Link>
          </p>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
