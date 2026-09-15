import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, default: 'General', trim: true },
  stock: { type: Number, required: true, min: 0, default: 0 },
  price: { type: Number, required: true, min: 0, default: 0 },
  sku: { type: String, trim: true, default: '' },
  status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock'], default: 'In Stock' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

inventorySchema.pre('save', function(next) {
  if (this.stock === 0) this.status = 'Out of Stock';
  else if (this.stock <= 5) this.status = 'Low Stock';
  else this.status = 'In Stock';
  next();
});

export default mongoose.model('Inventory', inventorySchema);
