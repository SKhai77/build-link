const express = require('express');
const router = express.Router();

// Import any required dependencies for handling form submissions and sending emails
const bodyParser = require('body-parser'); // You may need to install this package if not already installed
const nodemailer = require('nodemailer'); // For sending emails

// Define a route for handling contact form submissions
router.post('/contact', (req, res) => {
  // Extract data from the form submission
  const { name, email, message } = req.body;

  // Configure nodemailer to send the email (you may need to set up your email transport here)
  const transporter = nodemailer.createTransport({
    service: 'YourEmailServiceProvider', // e.g., 'Gmail'
    auth: {
      user: 'your-email@example.com', // Your email address
      pass: 'your-email-password', // Your email password or app password
    },
  });

  // Email configuration
  const mailOptions = {
    from: 'your-email@example.com', // Sender's email address
    to: 'recipient@example.com', // Recipient's email address
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
