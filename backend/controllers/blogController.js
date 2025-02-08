const Blog = require('../models/Blog');

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author, community, tags } = req.body;
    const blog = new Blog({ title, content, author, community, tags });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username').populate('community', 'name');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username').populate('community', 'name');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a blog
exports.likeBlog = async (req, res) => {
  try {
    const { userId } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.likes.includes(userId)) {
      return res.status(400).json({ message: 'You already liked this blog' });
    }

    blog.likes.push(userId);
    await blog.save();
    res.json({ message: 'Blog liked', blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comment on a blog
exports.commentOnBlog = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.comments.push({ user: userId, text });
    await blog.save();
    res.json({ message: 'Comment added', blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
