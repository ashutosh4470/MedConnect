import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  addedOn: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);
