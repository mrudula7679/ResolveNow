import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Footer from './FooterC';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/login', user);

      alert('Successfully logged in');

      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(res.data.user));

      const { userType } = res.data.user;

      // Redirect based on user type
      switch (userType) {
        case 'Admin':
          navigate('/AdminHome');
          break;
        case 'Ordinary':
          navigate('/HomePage');
          break;
        case 'Agent':
          navigate('/AgentHome');
          break;
        default:
          navigate('/login');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        alert("User doesn't exist or credentials are invalid");
      } else {
        alert("Server error. Please try again later.");
      }
      navigate('/login');
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar style={{ backgroundColor: '#f5f5dc' }} variant="light">
        <Container>
          <Navbar.Brand style={{ color: '#5c4033' }}>IssueTracker</Navbar.Brand>
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ color: '#5c4033' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link" style={{ color: '#5c4033' }}>SignUp</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" style={{ color: '#5c4033' }}>Login</Link>
            </li>
          </ul>
        </Container>
      </Navbar>

      {/* Login Form */}
      <section className="vh-100" style={{ backgroundColor: '#fffdd0', color: '#5c4033' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card"
                style={{ backgroundColor: '#fdf6e3', color: '#5c4033', border: '1px solid #e0d6b9' }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-4">Login to Register Your Complaint</h2>
                    <p className="mb-5">Enter your credentials below</p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4 text-start">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          required
                          autoComplete="email"
                          style={{ backgroundColor: '#fffaf0', color: '#5c4033' }}
                        />
                      </div>

                      <div className="form-outline mb-4 text-start">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          required
                          autoComplete="off"
                          style={{ backgroundColor: '#fffaf0', color: '#5c4033' }}
                        />
                      </div>

                      <button
                        className="btn btn-lg px-5"
                        type="submit"
                        style={{
                          backgroundColor: '#d2b48c',
                          color: '#fff',
                          border: 'none'
                        }}
                      >
                        Login
                      </button>
                    </form>
                  </div>
                  <div>
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <Link to="/signup" style={{ color: '#5c4033', fontWeight: 'bold' }}>
                        Sign up
                      </Link>
                    </p>
                  </div>
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

export default Login;
