import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';

const SignUp = () => {
  const [title, setTitle] = useState('Select User');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    userType: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleTitle = (selectedUserType) => {
    setTitle(selectedUserType);
    setUser((prev) => ({ ...prev, userType: selectedUserType }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === 'Select User') {
      alert('Please select a user type before registering');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/signup', user);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert('Error while registering. Please try again.');
      }
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar style={{ backgroundColor: '#f5f5dc' }} variant="light">
        <Container>
          <Navbar.Brand style={{ color: '#5c4033', fontWeight: 'bold' }}>IssueTracker</Navbar.Brand>
          <ul className="navbar-nav ms-auto d-flex flex-row gap-3">
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ color: '#5c4033' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link" style={{ color: '#5c4033' }}>Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" style={{ color: '#5c4033' }}>Login</Link>
            </li>
          </ul>
        </Container>
      </Navbar>

      {/* Signup Form */}
      <section style={{ backgroundColor: '#fffdd0', minHeight: '100vh', padding: '50px 0' }}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card" style={{ backgroundColor: '#fdf6e3', color: '#5c4033', border: '1px solid #e6d9b3' }}>
                <div className="card-body p-5 text-center">
                  <div className="mb-4">
                    <h2 className="fw-bold mb-3">Sign Up to Register Complaints</h2>
                    <form onSubmit={handleSubmit}>
                      {/* Name */}
                      <div className="form-outline mb-3 text-start">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          required
                          style={{ backgroundColor: '#fffaf0', color: '#5c4033' }}
                        />
                      </div>

                      {/* Email */}
                      <div className="form-outline mb-3 text-start">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          required
                          style={{ backgroundColor: '#fffaf0', color: '#5c4033' }}
                        />
                      </div>

                      {/* Password */}
                      <div className="form-outline mb-3 text-start">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          required
                          style={{ backgroundColor: '#fffaf0', color: '#5c4033' }}
                        />
                      </div>

                      {/* Phone */}
                      <div className="form-outline mb-3 text-start">
                        <label className="form-label">Mobile No.</label>
                        <input
                          type="tel"
                          name="phone"
                          value={user.phone}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          required
                          style={{ backgroundColor: '#fffaf0', color: '#5c4033' }}
                        />
                      </div>

                      {/* Dropdown */}
                      <div className="form-outline mb-3 text-start">
                        <label className="form-label">Select User Type</label>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" style={{ backgroundColor: '#fffaf0', color: '#5c4033', border: '1px solid #c8b98d' }}>
                            {title}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleTitle('Ordinary')}>Ordinary</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleTitle('Admin')}>Admin</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleTitle('Agent')}>Agent</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>

                      {/* Submit */}
                      <button className="btn btn-lg px-5 mt-3" type="submit" style={{ backgroundColor: '#d2b48c', color: '#fff', border: 'none' }}>
                        Register
                      </button>
                    </form>
                  </div>

                  {/* Already Registered */}
                  <p className="mb-0">
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#5c4033', fontWeight: 'bold' }}>
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default SignUp;
