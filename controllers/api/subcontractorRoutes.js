const router = require('express').Router();
const { Subcontractor } = require('../../models'); // Import the Subcontractor model
const withAuth = require('../../utils/auth'); // Import middleware for authentication

// Route to create a new subcontractor profile
router.post('/', withAuth, async (req, res) => {
  try {
    const { skills, certifications } = req.body;
    const { id: user_id } = req.user; // Get the user ID from the authenticated user

    // Create a new subcontractor profile
    const subcontractor = await Subcontractor.create({
      user_id,
      skills,
      certifications,
    });

    res.status(200).json(subcontractor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update an existing subcontractor profile
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { skills, certifications } = req.body;
    const { id: user_id } = req.user; // Get the user ID from the authenticated user

    // Update the subcontractor profile
    const subcontractor = await Subcontractor.update(
      {
        skills,
        certifications,
      },
      {
        where: {
          user_id,
          id: req.params.id,
        },
      }
    );

    res.status(200).json(subcontractor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get the subcontractor's own profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    const { id: user_id } = req.user; // Get the user ID from the authenticated user

    // Find the subcontractor profile associated with the user
    const subcontractor = await Subcontractor.findOne({
      where: { user_id },
    });

    res.status(200).json(subcontractor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Additional routes for subcontractors can be added as needed

module.exports = router;
