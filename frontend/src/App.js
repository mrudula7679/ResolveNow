import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Common Pages
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";

// User Pages
import HomePage from "./components/user/HomePage";
import Complaint from "./components/user/Complaint";
import Status from "./components/user/Status";

// Admin Pages
import AdminHome from "./components/admin/AdminDashboard";
import UserInfo from "./components/admin/UserManagement";
import AgentInfo from "./components/admin/AgentManagement";

// Agent Pages
import AgentHome from "./components/agent/AgentHome";

function App() {
  const userLoggedIn = !!localStorage.getItem("user");

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          {userLoggedIn ? (
            <>
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/complaint" element={<Complaint />} />
              <Route path="/status" element={<Status />} />
              <Route path="/admin-home" element={<AdminHome />} />
              <Route path="/user-info" element={<UserInfo />} />
              <Route path="/agent-home" element={<AgentHome />} />
              <Route path="/agent-info" element={<AgentInfo />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
