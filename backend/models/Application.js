const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address.']
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  applicationDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Applied', 'Interview', 'Selected', 'Rejected']
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
