// Import necessary modules and initialize the Express.js router
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Use the userRoutes for '/users' endpoint
router.use('/users', userRoutes);

// Use the postRoutes for '/posts' endpoint
router.use('/posts', postRoutes);

// Use the commentRoutes for '/comments' endpoint
router.use('/comments', commentRoutes);

// Export the router
module.exports = router;
