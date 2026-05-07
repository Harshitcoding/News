import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true},
  url: { type: String },
  points: { type: Number, default: 0 },
  author: { type: String },
  postedAt: { type: String },
}, { timestamps: true });

export default mongoose.model('Story', storySchema);