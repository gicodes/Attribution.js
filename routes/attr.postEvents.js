import express from 'express';
import { trackEvent } from './trackEvent.js';

const router = express.Router();

// Create event with trackEvent controller
router.post('/events', trackEvent);

export default router;
