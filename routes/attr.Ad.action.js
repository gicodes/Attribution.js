import express from 'express';
import { trackEvent } from './trackEvent.js';

const router = express.Router();

// Route handler for Ad interactions 
router.post('/ad-click', (req, res) => {
    res.set('Attribution-Reporting-Eligible', 'true');
  
    trackEvent(req, res);
  
    res.status(200).json({ message: 'Ad click registered' });
});

export default router;