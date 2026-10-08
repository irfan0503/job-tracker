const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
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
  location: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Embedded Systems', 'IoT', 'Web Development', 'Software']
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Remote', 'Hybrid', 'On-site']
  },
  applyLink: {
    type: String,
    trim: true,
    validate: {
      validator: (value) => !value || /^https?:\/\//i.test(value),
      message: 'Apply link must be a valid HTTP or HTTPS URL.'
    }
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
