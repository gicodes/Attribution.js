const mongoose = require('mongoose');

const AttributionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  campaignId: { type: String, required: true },
  productId: { type: String, required: true }, // ID of the product
  eventType: { type: String, enum: ['view', 'click', 'purchase'], required: true },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: Object }, // Additional data, e.g., browser info, location
});

const Attribution = mongoose.model('AttributionSchema', AttributionSchema);

module.exports = Attribution;
