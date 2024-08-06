import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Update events with PUT route handler
router.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const { eventType, metadata, location } = req.body;

  if (!eventType && !metadata && !location) {
    return res.status(400).json({ error: 'No fields provided to update' });
  }

  try {
    const db = req.dbClient.db('AttributionJs');

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    // build the update object with only provided fields
    const updateFields = {};
    if (eventType) updateFields.eventType = eventType;
    if (metadata) updateFields.metadata = metadata;
    if (location) updateFields.location = location;

    // update the event in the database
    const result = await db.collection('Attr.data').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', data: result.value });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

export default router;
