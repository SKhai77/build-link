const router = require('express').Router();
const { Job, Application, User } = require('../../models');

// Create a new job
router.post('/', async (req, res) => {
  try {
    const newJob = await Job.create({
      ...req.body,
      contractor_id: req.session.user_id, // Assuming user is logged in as a contractor
    });
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a job by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.update(req.body, {
      where: {
        id: req.params.id,
        contractor_id: req.session.user_id, // Ensure the user owns the job
      },
    });
    if (!updatedJob[0]) {
      res.status(404).json({ message: 'No job found with this ID' });
      return;
    }
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a job by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await Job.destroy({
      where: {
        id: req.params.id,
        contractor_id: req.session.user_id, // Ensure the user owns the job
      },
    });
    if (!deletedJob) {
      res.status(404).json({ message: 'No job found with this ID' });
      return;
    }
    res.status(200).json(deletedJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
