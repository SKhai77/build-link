const router = require('express').Router();
const { Application } = require('../../models'); // Import the Application model
const withAuth = require('../../utils/auth'); // Import middleware for authentication

// Route to apply for a job
router.post('/apply/:jobId', withAuth, async (req, res) => {
  try {
    // Get the job ID from the route parameters
    const { jobId } = req.params;
    const { id: subcontractorId } = req.user; // Get the subcontractor ID from the authenticated user

    // Create a new job application
    const application = await Application.create({
      job_id: jobId,
      subcontractor_id: subcontractorId,
      application_date: new Date(),
      status: 'Pending', // You can set the initial status as needed
    });

    res.status(200).json(application);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to view job applications for a subcontractor
router.get('/applications', withAuth, async (req, res) => {
  try {
    const { id: subcontractorId } = req.user; // Get the subcontractor ID from the authenticated user

    // Find all job applications for the subcontractor
    const applications = await Application.findAll({
      where: { subcontractor_id: subcontractorId },
      include: [/* Include any associations you need here */],
    });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Additional routes for managing applications can be added as needed

module.exports = router;
