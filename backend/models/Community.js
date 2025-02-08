const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  avatar: { type: String, default: 'default-community.png' },
  niches: [{ type: String }], // List of niches the community focuses on
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['admin', 'member'], default: 'member' }
    }
  ],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
}, { timestamps: true });

module.exports = mongoose.model('Community', communitySchema);
