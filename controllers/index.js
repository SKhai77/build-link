// Import the necessary module for creating routes
const router = require('express').Router();

// Import the API routes and home routes from other files
const apiRoutes = require('./api'); // These routes handle API requests
const homeRoutes = require('./homeRoutes'); // These routes handle home page requests

// Use the homeRoutes for requests to the root URL ('/') and sub-routes
router.use('/', homeRoutes);

// Use the apiRoutes for requests to URLs starting with '/api'
router.use('/api', apiRoutes);

// Export the router
module.exports = router;
