import express from 'express';

const router = express.Router();

// Retreive events with GET route handler
router.get('/events', async (req, res) => {
  const { 
    userId, 
    campaignId, 
    categoryId,
    productId,
    eventType,
    location
  } = req.query;

  const filter = {};

  if (userId) filter.userId = userId;
  if (campaignId) filter.campaignId = campaignId;
  if (categoryId) filter.categoryId = categoryId;
  if (productId) filter.productId = productId;
  if (eventType) filter.eventType = eventType;
  if (location) filter.location = location;

  try {
    const db = req.dbClient.db('AttributionJs');
    // use `find` and convert the result to an array
    const events = await db.collection('Attr.data').find(filter).toArray();

    res.status(200).json({ data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

export default router;
