import React, { useState } from 'react';
import './EmergencyContact.css';
import axios from 'axios'; // Import axios for HTTP requests

const EmergencyContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/api/emergency-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send the message');
    }
  };
  

  return (
    <div className='emergency-contact'>
      <h2>Contact Emergency Services</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='message'>Message:</label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            required
            disabled={loading}
          ></textarea>
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {error && <p className='error-message'>{error}</p>}
      {success && <p className='success-message'>{success}</p>}
      <div className='contact-info'>
        <h3>Emergency Contact Information</h3>
        <p>For immediate assistance, please call:</p>
        <p><strong>Emergency Hotline:</strong> 112</p>
        <p><strong>Police:</strong> 100</p>
        <p><strong>Fire Brigade:</strong> 101</p>
        <p><strong>Ambulance:</strong> 102</p>
      </div>
    </div>
  );
};

export default EmergencyContact;
