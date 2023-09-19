// Import necessary modules and initialize the Express.js router
const router = require('express').Router();
const applicationRoutes = require('./applicationRoutes');
const contactRoutes = require('./contactRoutes');
const contractorRoutes = require('./contractorRoutes');
const joblistingRoutes = require('./joblistingRoutes');
const jobRoutes = require('./jobRoutes');
const messageRoutes = require('./messageRoutes');
const postRoutes = require('./postRoutes');
const subcontractorRoutes = require('./subcontractorRoutes');
const userRoutes = require('./userRoutes');

// Use the applicationRoutes for '/applications' endpoint
router.use('/applications', applicationRoutes);

// Use the contactRoutes for '/contact' endpoint
router.use('/contact', contactRoutes);

// Use the contractorRoutes for '/contractors' endpoint
router.use('/contractors', contractorRoutes);

// Use the joblistingRoutes for '/joblistings' endpoint
router.use('/joblistings', joblistingRoutes);

// Use the jobRoutes for '/jobs' endpoint
router.use('/jobs', jobRoutes);

// Use the messageRoutes for '/messages' endpoint
router.use('/messages', messageRoutes);

// Use the postRoutes for '/posts' endpoint
router.use('/posts', postRoutes);

// Use the subcontractorRoutes for '/subcontractors' endpoint
router.use('/subcontractors', subcontractorRoutes);

// Use the userRoutes for '/users' endpoint
router.use('/users', userRoutes);

// Export the router
module.exports = router;
