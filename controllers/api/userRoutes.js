const router = require('express').Router();
const { User } = require('../../models'); // Import the User model
const withAuth = require('../../utils/auth'); // Import middleware for authentication

// Route to create a new user (registration)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, name, contact_info } = req.body;

    // Create a new user
    const user = await User.create({
      username,
      email,
      password,
      name,
      contact_info,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to log in (authentication)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find a user with the provided email
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
      return;
    }

    // Check if the provided password matches the stored hash
    const validPassword = await user.checkPassword(password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
      return;
    }

    // Set up the session
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.status(200).json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to log out (destroy session)
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Additional routes for user management can be added as needed

module.exports = router;
