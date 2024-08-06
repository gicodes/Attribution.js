const trackEvent = async (req, res) => {
  try {
    // destructuring the required fields from the request body
    const { 
      userId, 
      campaignId, 
      categoryId, 
      productId, 
      eventType,
      location,
      metadata 
    } = req.body;
    
    // basic validation to check for missing required fields
    if (!userId || !campaignId || !categoryId || !productId || !eventType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // construct the event object with the necessary fields
    const newEvent = {
      userId,
      campaignId,
      categoryId,
      productId,
      eventType,
      location: location || 'Unknown', // default value if location is not specified
      metadata: metadata || {}, // default to an empty object if no metadata is provided
      timestamp: new Date(),
    };

    // access the database and insert the new event into the collection
    const db = req.dbClient.db('AttributionJs');
    const result = await db.collection('Attr.data').insertOne(newEvent);

    // respond with the inserted event's details
    res.status(201).json({ message: 'Event tracked successfully', data: result.ops[0] });
  } catch (error) {
    // handle any errors that occur during the process
    console.error('Error tracking event:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports = {
  trackEvent,
};