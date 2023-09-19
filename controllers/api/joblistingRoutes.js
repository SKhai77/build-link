const router = require('express').Router();
const { JobListing, Application, User } = require('../../models');

// Create a new job listing
router.post('/', async (req, res) => {
  try {
    const newJobListing = await JobListing.create({
      ...req.body,
      contractor_id: req.session.user_id, // Assuming user is logged in as a contractor
    });
    res.status(201).json(newJobListing);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a job listing by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedJobListing = await JobListing.update(req.body, {
      where: {
        id: req.params.id,
        contractor_id: req.session.user_id, // Ensure the user owns the job listing
      },
    });
    if (!updatedJobListing[0]) {
      res.status(404).json({ message: 'No job listing found with this ID' });
      return;
    }
    res.status(200).json(updatedJobListing);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a job listing by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedJobListing = await JobListing.destroy({
      where: {
        id: req.params.id,
        contractor_id: req.session.user_id, // Ensure the user owns the job listing
      },
    });
    if (!deletedJobListing) {
      res.status(404).json({ message: 'No job listing found with this ID' });
      return;
    }
    res.status(200).json(deletedJobListing);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
