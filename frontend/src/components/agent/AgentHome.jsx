import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  Card,
  Alert,
  Collapse,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import ChatWindow from "../common/ChatWindow";
import Footer from "../common/FooterC";

const AgentHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [chatVisible, setChatVisible] = useState({});

  useEffect(() => {
    const fetchAgentComplaints = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return navigate("/");

        setUserName(user.name);
        const res = await axios.get(`http://localhost:8000/allcomplaints/${user._id}`);
        const data = res.data.map((item) => ({
          ...item._doc,
          assignmentId: item._id,
        }));
        setComplaints(data);
      } catch (err) {
        console.error("Error loading complaints:", err);
      }
    };

    fetchAgentComplaints();
  }, [navigate]);

  const toggleChat = (id) => {
    setChatVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleStatusChange = async (id) => {
    try {
      await axios.put(`http://localhost:8000/complaint/${id}`, { status: "completed" });
      setComplaints((prev) =>
        prev.map((comp) =>
          comp.complaintId === id ? { ...comp, status: "completed" } : comp
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="body">
        <Navbar bg="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand className="text-white">Hi Agent {userName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto">
                <NavLink className="nav-link text-white">View Complaints</NavLink>
              </Nav>
              <Button onClick={logout} variant="outline-danger">
                Log out
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {complaints.length > 0 ? (
            complaints.map((complaint, index) => (
              <Card key={index} style={{ width: "20rem", margin: "15px" }}>
                <Card.Body>
                  <Card.Title>
                    <b>Name:</b> {complaint.name}
                  </Card.Title>
                  <Card.Text><b>Address:</b> {complaint.address}</Card.Text>
                  <Card.Text><b>City:</b> {complaint.city}</Card.Text>
                  <Card.Text><b>State:</b> {complaint.state}</Card.Text>
                  <Card.Text><b>Pincode:</b> {complaint.pincode}</Card.Text>
                  <Card.Text><b>Comment:</b> {complaint.comment}</Card.Text>
                  <Card.Text><b>Status:</b> {complaint.status}</Card.Text>

                  {complaint.status !== "completed" && (
                    <Button
                      variant="primary"
                      onClick={() => handleStatusChange(complaint.complaintId)}
                    >
                      Mark as Completed
                    </Button>
                  )}

                  <Button
                    variant="info"
                    className="mx-2"
                    onClick={() => toggleChat(complaint.complaintId)}
                    aria-controls={`chat-${complaint.complaintId}`}
                    aria-expanded={chatVisible[complaint.complaintId] || false}
                  >
                    {chatVisible[complaint.complaintId] ? "Hide" : "Message"}
                  </Button>

                  <Collapse in={chatVisible[complaint.complaintId]}>
                    <div id={`chat-${complaint.complaintId}`} className="mt-2">
                      <Card body style={{ width: "100%" }}>
                        <ChatWindow
                          complaintId={complaint.complaintId}
                          name={userName}
                        />
                      </Card>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Alert variant="info">
              <Alert.Heading>No complaints assigned.</Alert.Heading>
            </Alert>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AgentHome;
