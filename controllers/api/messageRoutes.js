const router = require('express').Router();
const { Message } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route to retrieve all messages for a user
router.get('/messages', withAuth, async (req, res) => {
  try {
    // Retrieve all messages for the logged-in user
    const messages = await Message.findAll({
      where: {
        receiver_id: req.session.user_id,
      },
    });

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST route to send a new message
router.post('/messages', withAuth, async (req, res) => {
  try {
    // Create a new message with the data from the request body
    const newMessage = await Message.create({
      sender_id: req.session.user_id,
      receiver_id: req.body.receiver_id,
      content: req.body.content,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE route to delete a message by ID
router.delete('/messages/:id', withAuth, async (req, res) => {
  try {
    // Delete a message by ID if it belongs to the logged-in user
    const deletedMessage = await Message.destroy({
      where: {
        id: req.params.id,
        sender_id: req.session.user_id,
      },
    });

    if (!deletedMessage) {
      res.status(404).json({ message: 'No message found with this id' });
      return;
    }

    res.status(200).json(deletedMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
