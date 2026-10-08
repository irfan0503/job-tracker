const mongoose = require('mongoose');

async function connectDB() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to backend/.env before starting the server.');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed. Check that MONGODB_URI is correct and the database is reachable.');
    throw new Error('Unable to connect to MongoDB. Check the server logs and MONGODB_URI.');
  }
}

module.exports = connectDB;
