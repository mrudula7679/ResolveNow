import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Collapse,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../common/FooterC";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formVisible, setFormVisible] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Fetch users on load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/OrdinaryUsers");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [navigate]);

  // Toggle form visibility
  const toggleForm = (userId) => {
    setFormVisible((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Update user info
  const handleUpdate = async (userId) => {
    const { name, email, phone } = formData;
    if (!name && !email && !phone) {
      return alert("Please fill at least one field to update.");
    }

    const confirm = window.confirm("Are you sure you want to update the user?");
    if (!confirm) return;

    try {
      const response = await axios.put(
        `http://localhost:8000/user/${userId}`,
        formData
      );
      alert("User updated successfully.");
      console.log("Update response:", response.data);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <>
      <div className="body">
        <Container>
          {users.length === 0 ? (
            <Alert variant="info">
              <Alert.Heading>No users found.</Alert.Heading>
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
                {users.map((user) => {
                  const isVisible = formVisible[user._id] || false;

                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="mx-2"
                          onClick={() => toggleForm(user._id)}
                          aria-expanded={isVisible}
                        >
                          Update
                        </Button>

                        <Collapse in={isVisible}>
                          <div>
                            <Form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(user._id);
                              }}
                              className="p-3"
                            >
                              <Form.Group className="mb-2">
                                <Form.Label>Full Name</Form.Label>
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
                          variant="outline-danger"
                          size="sm"
                          className="mx-2"
                          onClick={() => handleDelete(user._id)}
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
      </div>
      <Footer />
    </>
  );
};

export default UserManagement;
