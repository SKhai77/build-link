// Import necessary modules and initialize the Express.js router
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Define a route that handles GET requests to retrieve comments
router.get('/', async (req, res) => {
  try {
    const data = await Comment.findAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create post route to create comment
router.post('/', withAuth, async (req, res) => {
  try {
    const { commentBody, post_id } = req.body;
    const { username, user_id } = req.session; // Get the username from the session

    if (!username) {
      // Handle the case where username is not available (e.g., user is not authenticated)
      return res.status(401).json({ error: 'User is not authenticated.' });
    }

    const newComment = await Comment.create({
      commentBody,
      username, // Attach the username to the comment
      post_id,
      user_id,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Export the router
module.exports = router;
