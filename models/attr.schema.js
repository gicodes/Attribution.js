const mongoose = require('mongoose');

const AttributionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  campaignId: { type: String, required: true },
  categoryId: { type: String, required: true },
  productId: { type: String, required: true },
  eventType: { type: String, enum: ['view', 'click', 'purchase'], required: true },
  location: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: Object }, // additional data, e.g. Browser info, Location
});

const Attribution = mongoose.model('AttributionSchema', AttributionSchema);

module.exports = Attribution;
