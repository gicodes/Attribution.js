const trackEvent = async (req, res) => {
  // function to handle tracking of Ad events
  try {
    const { 
      userId, 
      campaignId, 
      productId, 
      categoryId, 
      eventType, 
      metadata 
    } = req.body;
    
    const newEvent = {
      userId,
      campaignId,
      productId,
      categoryId,
      eventType,
      timestamp: new Date(),
      metadata,
    };

    // Insert the new event into the database
    const db = req.dbClient.db('AttributionJs');
    const result = await db.collection('Attr.data').insertOne(newEvent);

    res.status(201).json({ message: 'Event tracked successfully', data: result.ops[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  trackEvent,
};