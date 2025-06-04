import mongoose from 'mongoose';
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['lost', 'found'], required: true },
  location: String,
  contact: String,
  imageUrl: String,
  resolved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Item', ItemSchema);
