import React, { useState, useEffect } from 'react';
import '../CSS/contact.css';
import emailjs from 'emailjs-com';
import Header from '../Component/Header';
import Footer from '../Component/Footer';


function ContactForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to a server or perform an action.
    console.log('Name:', name);
    console.log('Message:', message);
    // Send the email using Email.js
    emailjs
      .send("service_345z5hl", "template_e6n94qx", {
        to_email: "it21276446@my.sliit.lk",
        from_name: name,
        message: message,
      })
      .then((response) => {
        console.log("Email sent successfully!", response);
        // Optionally, you can clear the form fields after a successful submission.
        setName('');
        setMessage('');
      })
      .catch((error) => {
        console.error("Email send failed:", error);
      });
  };

  // Initialize Email.js with your User ID
  useEffect(() => {
    emailjs.init("_j6_BbSChg9GN-Oy3");
  }, []);

  return (
    <>
    <Header/>
    <div className="form-container">
      <h1 className="title-main">We'd Love to Hear From You</h1>
      <p className="text-main">Whether you're curious about features, want to leave us a feedback - we're ready to hear from you!</p>
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Email Address:</label>
          <input
            type="email"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={handleMessageChange}
            required
            className="input-field"
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default ContactForm;
