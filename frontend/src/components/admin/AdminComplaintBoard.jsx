import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Alert from "react-bootstrap/Alert";
import Footer from "../common/FooterC";
import axios from "axios";

const AdminComplaintBoard = () => {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchComplaints();
    fetchAgents();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:8000/status");
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await axios.get("http://localhost:8000/AgentUsers");
      setAgents(res.data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  const assignComplaintToAgent = async (agentId, complaintId, status, agentName) => {
    try {
      await axios.get(`http://localhost:8000/AgentUsers/${agentId}`);
      const assignment = {
        agentId,
        complaintId,
        status,
        agentName,
      };
      await axios.post("http://localhost:8000/assignedComplaints", assignment);

      // Remove assigned complaint from UI
      const updated = complaints.filter((c) => c._id !== complaintId);
      setComplaints(updated);

      alert(`Complaint assigned to agent: ${agentName}`);
    } catch (err) {
      console.error("Error assigning complaint:", err);
    }
  };

  return (
    <div>
      <Accordion className="accordion" alwaysOpen>
        {/* Complaints Section */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Complaints List</Accordion.Header>
          <Accordion.Body style={{ background: "aliceblue" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", padding: "20px" }}>
              {complaints.length > 0 ? (
                complaints.map((item, idx) => (
                  <Card key={item._id || idx} style={{ width: "16rem" }}>
                    <Card.Body className="text-center">
                      <Card.Title>Name: {item.name}</Card.Title>
                      <div style={{ fontSize: "14px", marginTop: "15px" }}>
                        <Card.Text>Address: {item.address}</Card.Text>
                        <Card.Text>City: {item.city}</Card.Text>
                        <Card.Text>State: {item.state}</Card.Text>
                        <Card.Text>Pincode: {item.pincode}</Card.Text>
                        <Card.Text>Comment: {item.comment}</Card.Text>
                        <Card.Text>Status: {item.status}</Card.Text>
                      </div>

                      {item.status === "completed" ? null : (
                        <Dropdown className="mt-2">
                          <Dropdown.Toggle variant="warning" id="dropdown-agent">
                            Assign Agent
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {agents.map((agent) => (
                              <Dropdown.Item
                                key={agent._id}
                                onClick={() =>
                                  assignComplaintToAgent(agent._id, item._id, item.status, agent.name)
                                }
                              >
                                {agent.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info">
                  <Alert.Heading>No complaints to show</Alert.Heading>
                </Alert>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Agent Section */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Agent List</Accordion.Header>
          <Accordion.Body style={{ background: "aliceblue" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", padding: "20px" }}>
              {agents.length > 0 ? (
                agents.map((agent, idx) => (
                  <Card key={agent._id || idx} style={{ width: "20rem" }}>
                    <Card.Body>
                      <Card.Title>{agent.name}</Card.Title>
                      <Card.Text>{agent.email}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info">
                  <Alert.Heading>No agents to display</Alert.Heading>
                </Alert>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Footer />
    </div>
  );
};

export default AdminComplaintBoard;
