const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

// ✅ Create Redis client for Cloud (Upstash, AWS, etc.)
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true, // Enables secure connection
  },
});

// ✅ Connect to Redis Cloud
redisClient
  .connect()
  .then(() => console.log("✅ Connected to Redis Cloud"))
  .catch((err) => console.error("❌ Redis connection error:", err));

module.exports = redisClient;
