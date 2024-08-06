import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Delete events with delete route handler
router.delete('/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const db = req.dbClient.db('AttributionJs');
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    const result = await db.collection('Attr.data').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

export default router;
