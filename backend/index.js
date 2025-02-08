require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');
const communityRoutes = require('./routes/communityRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/user', authRoutes);
app.use("/community", require("./routes/communityRoutes"));
app.use("/blog", require("./routes/blogRoutes"));
app.use("/post", require("./routes/postRoutes"));

// Socket.io
require('./sockets/socketHandler')(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
