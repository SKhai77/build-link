const router = require('express').Router();
const { Contractor } = require('../../models'); // Import the Contractor model
const withAuth = require('../../utils/auth'); // Import middleware for authentication

// Route to create a new contractor profile
router.post('/', withAuth, async (req, res) => {
  try {
    const { company_name, address } = req.body;
    const { id: user_id } = req.user; // Get the user ID from the authenticated user

    // Create a new contractor profile
    const contractor = await Contractor.create({
      user_id,
      company_name,
      address,
    });

    res.status(200).json(contractor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update an existing contractor profile
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { company_name, address } = req.body;
    const { id: user_id } = req.user; // Get the user ID from the authenticated user

    // Update the contractor profile
    const contractor = await Contractor.update(
      {
        company_name,
        address,
      },
      {
        where: {
          user_id,
          id: req.params.id,
        },
      }
    );

    res.status(200).json(contractor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get the contractor's own profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    const { id: user_id } = req.user; // Get the user ID from the authenticated user

    // Find the contractor profile associated with the user
    const contractor = await Contractor.findOne({
      where: { user_id },
    });

    res.status(200).json(contractor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Additional routes for contractors can be added as needed

module.exports = router;
