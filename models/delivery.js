// models/delivery.js
import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  medicineName: String,
  quantity: Number,
  deliveredTo: String,
  date: {
    type: Date,
    default: Date.now,
  },
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request', // Reference to Request model
    required: true,
  }
});

export default mongoose.models.Delivery || mongoose.model('Delivery', deliverySchema);
