import express from 'express';

const router = express.Router();

// Route for handling conversion events
router.post('/conversion', async (req, res) => {
    const { id } = req.params;
    const { eventType, metadata, location } = req.body;

    const triggerData = {
      triggerData: 123, // example trigger data
    };
    res.set('Attribution-Reporting-Register-Trigger', JSON.stringify(triggerData));
  
    try {
        const db = req.dbClient.db('AttributionJs');
    
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid event ID' });
        }
    
        const updateFields = {};
        if (eventType) updateFields.eventType = eventType;
        if (metadata) updateFields.metadata = metadata;
        if (location) updateFields.location = location;
    
        const result = await db.collection('Attr.data').findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updateFields },
          { returnDocument: 'after' }
        );
    
        if (!result.value) {
          return res.status(404).json({ error: 'Event not found' });
        }
    
        res.status(200).json({ message: 'Conversion Registered' });
      } catch (error) {
        console.error('Error Registering Conversion:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
      }
  });
  
  export default router;