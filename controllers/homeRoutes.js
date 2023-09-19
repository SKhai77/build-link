// Import necessary modules and initialize the Express.js router
const router = require('express').Router();
const { JobListing, User } = require('../models');
const withAuth = require('../utils/auth');

// Define a route to handle GET requests for the homepage
router.get('/', async (req, res) => {
  try {
    // Get all job listings and JOIN with user data
    const jobListingsData = await JobListing.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const jobListings = jobListingsData.map((jobListing) =>
      jobListing.get({ plain: true })
    );

    // Pass serialized data and session flag into the template
    res.render('homepage', {
      jobListings,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Display a specific job listing
router.get('/job/:id', async (req, res) => {
  try {
    // Get the job listing with associated user data
    const jobListingData = await JobListing.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const jobListing = jobListingData.get({ plain: true });

    res.render('job', {
      jobListing,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/profile', (req, res) => {
  res.render('profile', {
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
  });
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// Include routes for creating and editing job listings (withAuth middleware ensures only logged-in users can access)
router.get('/create-job', withAuth, (req, res) => {
  res.render('create-job', {
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
  });
});

router.get('/edit-job/:id', withAuth, async (req, res) => {
  try {
    // Get the job listing data for editing
    const jobListingData = await JobListing.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!jobListingData) {
      res.status(404).json({ message: 'No job listing found with this id!' });
      return;
    }

    const jobListing = jobListingData.get({ plain: true });

    res.render('edit-job', {
      jobListing,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
