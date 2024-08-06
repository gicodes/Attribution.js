const express = require('express');
const { trackEvent } = require('../controllers/index');

const router = express.Router();

// Endpoint for testing server
router.get('/test', async (req, res) => {
    try {
      res.status(201).json('This API connection works perfectly-- Thank you!')
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})

// Endpoint for tracking events
router.post('/track', trackEvent);

module.exports = router;
