import axios from 'axios';
import React, { useState } from 'react';

const Complaint = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userComplaint, setUserComplaint] = useState({
    userId: user?._id || '',
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: 'pending',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserComplaint({ ...userComplaint, [name]: value });
  };

  const handleClear = () => {
    setUserComplaint({
      userId: user?._id || '',
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: 'pending',
      comment: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:8000/Complaint/${user._id}`, userComplaint);
      alert('Your complaint has been submitted!');
      console.log(res.data.userComplaint);
      handleClear();
    } catch (err) {
      console.error(err);
      alert('Something went wrong while submitting your complaint!');
    }
  };

  return (
    <div
      className="complaint-box"
      style={{
        backgroundColor: '#fffdd0',
        padding: '40px 20px',
        borderRadius: '10px',
        maxWidth: '900px',
        margin: '40px auto',
        color: '#5c4033',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}
    >
      <h2
        className="text-center mb-4"
        style={{
          backgroundColor: '#fdf6e3',
          padding: '10px',
          borderRadius: '6px',
          color: '#5c4033'
        }}
      >
        Register Complaint
      </h2>

      <form onSubmit={handleSubmit} className="row">
        {/* Name */}
        <div className="col-md-6 mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            name="name"
            onChange={handleChange}
            value={userComplaint.name}
            type="text"
            className="form-control"
            style={{ backgroundColor: '#fffaf0', color: '#5c4033' }}
            id="name"
            required
          />
        </div>

        {/* Address */}
        <div className="col-md-6 mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            name="address"
            onChange={handleChange}
            value={userComplaint.address}
            type="text"
            className="form-control"
            style={{ backgroundColor: '#fffaf0', color: '#5c4033' }}
            id="address"
            required
          />
        </div>

        {/* City */}
        <div className="col-md-6 mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            name="city"
            onChange={handleChange}
            value={userComplaint.city}
            type="text"
            className="form-control"
            style={{ backgroundColor: '#fffaf0', color: '#5c4033' }}
            id="city"
            required
          />
        </div>

        {/* State */}
        <div className="col-md-6 mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input
            name="state"
            onChange={handleChange}
            value={userComplaint.state}
            type="text"
            className="form-control"
            style={{ backgroundColor: '#fffaf0', color: '#5c4033' }}
            id="state"
            required
          />
        </div>

        {/* Pincode */}
        <div className="col-md-6 mb-3">
          <label htmlFor="pincode" className="form-label">Pincode</label>
          <input
            name="pincode"
            onChange={handleChange}
            value={userComplaint.pincode}
            type="text"
            className="form-control"
            style={{ backgroundColor: '#fffaf0', color: '#5c4033' }}
            id="pincode"
            required
          />
        </div>

        {/* Status */}
        <div className="col-md-6 mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <input
            name="status"
            value="pending"
            disabled
            className="form-control"
            style={{ backgroundColor: '#fdf6e3', color: '#5c4033' }}
            id="status"
          />
        </div>

        {/* Comment */}
        <div className="col-md-12 mb-4">
          <label htmlFor="comment" className="form-label">Description</label>
          <textarea
            name="comment"
            onChange={handleChange}
            value={userComplaint.comment}
            className="form-control"
            rows="4"
            style={{ backgroundColor: '#fffaf0', color: '#5c4033' }}
            placeholder="Enter complaint details"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center col-12">
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: '#d2b48c',
              color: '#fff',
              padding: '10px 30px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Complaint;
