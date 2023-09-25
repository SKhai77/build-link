const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize'); // Import Sequelize's Op for querying

// GET route to render the edit post page
router.get('/edit-post/:id', withAuth, async (req, res) => {
  try {
    // Find the post by ID
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Render the edit-post.handlebars view and pass the post data
    res.render('edit-post', {
      post: postData.get({ plain: true }),
      logged_in: req.session.logged_in,
      editing: true, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for rendering the homepage with search results or all job listings
router.get('/', async (req, res) => {
  try {
    const { keywords, location } = req.query;

    if (keywords || location) {
      const searchData = await Post.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${keywords}%` } },
            { location: { [Op.like]: `%${location}%` } },
          ],
        },
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });

      const posts = searchData.map((post) => post.get({ plain: true }));

      return res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
        user_name: req.session.user_name,
      });
    }

    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const serializedPosts = posts.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts: serializedPosts,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    // Consider using a centralized error handler
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for rendering the job listings page
router.get('/joblisting', async (req, res) => {
  try {
    // Fetch all job posts
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const serializedPosts = posts.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into the joblisting template
    res.render('joblisting', {
      posts: serializedPosts,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for displaying a specific post and its associated comments
router.get('/post/:id', async (req, res) => {
  try {
    // Get the post with associated user and comments
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
        },
      ],
    });

    const post = postData.get({ plain: true });

    // Pass user_id from the session to the template
    const user_id = req.session.user_id;

    res.render('post', {
      post,
      user_id, // Pass user_id to the template
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for rendering the user's profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for rendering the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// Route for rendering the "About Us" page
router.get('/about', (req, res) => {
  res.render('about');
});

// Route for rendering the "Contact" page
router.get('/contact', (req, res) => {
  res.render('contact');
});

// Route for handling search requests
router.get('/search', async (req, res) => {
  try {
    // Get search parameters from the query string
    const { keywords, location } = req.query;

    // Define an empty object to store the search criteria
    const searchCriteria = {};

    // If keywords are provided, add them to the search criteria
    if (keywords) {
      searchCriteria.title = {
        [Op.like]: `%${keywords}%`, // Case-insensitive title search
      };
    }

    // If location is provided, add it to the search criteria
    if (location) {
      searchCriteria.location = {
        [Op.like]: `%${location}%`, // Case-insensitive location search
      };
    }

    // Fetch job posts based on the search criteria
    const searchData = await Post.findAll({
      where: searchCriteria,
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      // Add the COLLATE clause for case-insensitive searching
      collate: 'utf8_general_ci',
    });

    const searchResults = searchData.map((post) => post.get({ plain: true }));

    // Render the search-results.handlebars page with the filtered posts
    res.render('search-results', {
      searchResults, // Pass the search results to the template
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
