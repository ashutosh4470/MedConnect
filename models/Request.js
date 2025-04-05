import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  medicineName: String,
  quantity: Number,
  status: { type: String, enum: ['pending', 'accepted', 'delivered'], default: 'pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

export default mongoose.models.Request || mongoose.model('Request', requestSchema);
