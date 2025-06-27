import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from './FooterC';

const Home = () => {
  return (
    <>
      {/* Dark Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>ResolveNow</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Centered Section without Image */}
      <section
        style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}
        className="d-flex justify-content-center align-items-center"
      >
        <Container className="text-center">
          <div className="p-5 bg-white rounded-4 shadow mx-auto" style={{ maxWidth: '600px' }}>
            <h2 className="fw-bold text-dark mb-3">Empower Your Team</h2>
            <p className="text-muted mb-2">Exceed Customer Expectations</p>
            <p className="text-muted">with our Complaint Management Solution.</p>
            <Link to="/login">
              <Button variant="primary" className="mt-3">
                Register your Complaint
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Home;
