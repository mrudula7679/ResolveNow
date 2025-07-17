import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import UserInfo from "./UserManagement";
import AdminComplaintBoard from "./AdminComplaintBoard";
import AgentInfo from "./AgentManagement";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState("dashboard");
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const fetchAdminInfo = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const { name } = JSON.parse(storedUser);
          setAdminName(name);
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Failed to fetch admin info:", err);
      }
    };

    fetchAdminInfo();
  }, [navigate]);

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" className="text-white">
        <Container fluid>
          <Navbar.Brand className="text-white">
            Welcome, Admin {adminName}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar" />
          <Navbar.Collapse id="admin-navbar">
            <Nav className="me-auto" navbarScroll>
              <NavLink
                className={`nav-link text-light ${currentView === "dashboard" ? "active" : ""}`}
                onClick={() => handleNavigation("dashboard")}
              >
                Dashboard
              </NavLink>
              <NavLink
                className={`nav-link text-light ${currentView === "UserInfo" ? "active" : ""}`}
                onClick={() => handleNavigation("UserInfo")}
              >
                Users
              </NavLink>
              <NavLink
                className={`nav-link text-light ${currentView === "Agent" ? "active" : ""}`}
                onClick={() => handleNavigation("Agent")}
              >
                Agents
              </NavLink>
            </Nav>
            <Button variant="outline-danger" onClick={handleLogout}>
              Log out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="content">
        {currentView === "dashboard" && <AdminComplaintBoard />}
        {currentView === "UserInfo" && <UserInfo />}
        {currentView === "Agent" && <AgentInfo />}
      </div>
    </>
  );
};

export default AdminDashboard;
