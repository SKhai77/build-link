// Import the necessary module for creating routes
const router = require('express').Router();

// Import the API routes and home routes from other files
const apiRoutes = require('./api'); // These routes handle API requests
const homeRoutes = require('./homeRoutes'); // These routes handle home page requests
const contactRoutes = require('./api/contactRoutes');
const jobRoutes = require('./api/jobRoutes');
const joblistingsRoutes = require('./api/joblistingRoutes');

// Use the homeRoutes for requests to the root URL ('/') and sub-routes
router.use('/', homeRoutes);

// Use the apiRoutes for requests to URLs starting with '/api'
router.use('/api', apiRoutes);
router.use('/api', contactRoutes);
router.use('/api', jobRoutes);
router.use('/api', joblistingsRoutes);

// Export the router
module.exports = router;
