import React, { useState } from 'react';
import './EmergencyContact.css';

const EmergencyContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    alert('Message sent!');
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
          ></textarea>
        </div>
        <button type='submit'>Send Message</button>
      </form>
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
