const express = require('express');
const router = express.Router();

// Import any required dependencies for handling form submissions and sending emails
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Define a route for handling contact form submissions
router.post('/', (req, res) => {
  // Extract data from the form submission
  const { name, email, message } = req.body;

  // Configure nodemailer to send the email
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email configuration
  const mailOptions = {
    from: 'visitor', 
    to: 'khaipi@hotmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

module.exports = router;
