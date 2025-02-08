const Community = require('../models/Community');

// Create a new community
exports.createCommunity = async (req, res) => {
  try {
    const { name, description, niches, avatar } = req.body;
    const community = new Community({ name, description, niches, avatar });
    await community.save();
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all communities
exports.getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find().populate('members.user', 'username email');
    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific community by ID
exports.getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id).populate('members.user', 'username email');
    if (!community) return res.status(404).json({ message: 'Community not found' });
    res.json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a member to the community
exports.addMember = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ message: 'Community not found' });

    // Check if user already exists
    if (community.members.some(member => member.user.toString() === userId)) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    community.members.push({ user: userId, role });
    await community.save();
    res.json({ message: 'Member added successfully', community });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
