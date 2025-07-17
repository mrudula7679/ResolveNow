import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusComplaints, setStatusComplaints] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id, name } = user;
    setUserName(name);

    axios.get(`http://localhost:8000/status/${_id}`)
      .then((res) => {
        setStatusComplaints(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
      ...prevState,
      [complaintId]: !prevState[complaintId],
    }));
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
      {statusComplaints.length > 0 ? (
        statusComplaints.map((complaint) => {
          const open = toggle[complaint._id] || false;
          return (
            <Card
              key={complaint._id}
              style={{
                width: '18.5rem',
                margin: '0 15px 15px 0',
                backgroundColor: '#fffaf0',
                color: '#5c4033',
                border: '1px solid #e0d4b7'
              }}
            >
              <Card.Body>
                <Card.Title><b>Name:</b> {complaint.name}</Card.Title>
                <Card.Text><b>Address:</b> {complaint.address}</Card.Text>
                <Card.Text><b>City:</b> {complaint.city}</Card.Text>
                <Card.Text><b>State:</b> {complaint.state}</Card.Text>
                <Card.Text><b>Pincode:</b> {complaint.pincode}</Card.Text>
                <Card.Text><b>Comment:</b> {complaint.comment}</Card.Text>
                <Card.Text><b>Status:</b> {complaint.status}</Card.Text>

                <Button
                  onClick={() => handleToggle(complaint._id)}
                  aria-controls={`collapse-${complaint._id}`}
                  aria-expanded={open}
                  style={{
                    backgroundColor: '#d2b48c',
                    border: 'none',
                    color: '#fff',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}
                >
                  Message
                </Button>

                <div style={{ minHeight: '100%' }}>
                  <Collapse in={open} dimension="width">
                    <div id={`collapse-${complaint._id}`}>
                      <Card
                        body
                        style={{
                          width: '250px',
                          marginTop: '12px',
                          backgroundColor: '#fdf6e3',
                          color: '#5c4033',
                          border: '1px solid #e0d4b7'
                        }}
                      >
                        <ChatWindow
                          key={complaint._id}
                          complaintId={complaint._id}
                          name={userName}
                        />
                      </Card>
                    </div>
                  </Collapse>
                </div>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <Alert
          variant="light"
          style={{
            backgroundColor: '#fdf6e3',
            color: '#5c4033',
            border: '1px solid #e0d4b7',
            width: '100%',
            textAlign: 'center'
          }}
        >
          <Alert.Heading>No complaints to show</Alert.Heading>
        </Alert>
      )}
    </div>
  );
};

export default Status;
