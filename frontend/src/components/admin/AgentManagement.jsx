import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Collapse,
  Form,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import Footer from "../common/FooterC";
import { useNavigate } from "react-router-dom";

const AgentManagement = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Fetch agent list
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/AgentUsers");
        setAgents(response.data);
      } catch (err) {
        console.error("Failed to fetch agents:", err);
      }
    };
    fetchAgents();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Toggle update form visibility
  const toggleUpdateForm = (agentId) => {
    setExpanded((prev) => ({
      ...prev,
      [agentId]: !prev[agentId],
    }));
  };

  // Submit update request
  const handleUpdate = async (agentId) => {
    if (!formData.name && !formData.email && !formData.phone) {
      alert("Please fill at least one field.");
      return;
    }

    const confirm = window.confirm("Confirm agent update?");
    if (!confirm) return;

    try {
      const res = await axios.put(
        `http://localhost:8000/user/${agentId}`,
        formData
      );
      alert("Agent updated successfully.");
      console.log("Updated Agent:", res.data);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // Delete an agent
  const handleDelete = async (agentId) => {
    const confirm = window.confirm("Are you sure you want to delete this agent?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/OrdinaryUsers/${agentId}`);
      setAgents((prev) => prev.filter((agent) => agent._id !== agentId));
    } catch (err) {
      console.error("Deletion failed:", err);
    }
  };

  return (
    <>
      <Container className="body">
        {agents.length === 0 ? (
          <Alert variant="info">
            <Alert.Heading>No agents available.</Alert.Heading>
          </Alert>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => {
                const isOpen = expanded[agent._id] || false;
                return (
                  <tr key={agent._id}>
                    <td>{agent.name}</td>
                    <td>{agent.email}</td>
                    <td>{agent.phone}</td>
                    <td>
                      <Button
                        onClick={() => toggleUpdateForm(agent._id)}
                        variant="outline-warning"
                        size="sm"
                        className="mx-1"
                      >
                        Update
                      </Button>

                      <Collapse in={isOpen}>
                        <div>
                          <Form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleUpdate(agent._id);
                            }}
                            className="p-3"
                          >
                            <Form.Group className="mb-2">
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                placeholder="Update name"
                                value={formData.name}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <Form.Group className="mb-2">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                placeholder="Update email"
                                value={formData.email}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <Form.Group className="mb-2">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control
                                type="tel"
                                name="phone"
                                placeholder="Update phone"
                                value={formData.phone}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <Button
                              type="submit"
                              variant="outline-success"
                              size="sm"
                            >
                              Save
                            </Button>
                          </Form>
                        </div>
                      </Collapse>

                      <Button
                        onClick={() => handleDelete(agent._id)}
                        variant="outline-danger"
                        size="sm"
                        className="mx-1"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default AgentManagement;
