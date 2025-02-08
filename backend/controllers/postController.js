const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author, community } = req.body;
    const post = new Post({ title, content, author, community });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username').populate('community', 'name');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username').populate('community', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You already liked this post' });
    }

    post.likes.push(userId);
    await post.save();
    res.json({ message: 'Post liked', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comment on a post
exports.commentOnPost = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ user: userId, text });
    await post.save();
    res.json({ message: 'Comment added', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
