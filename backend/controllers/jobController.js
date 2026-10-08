const mongoose = require('mongoose');
const Job = require('../models/Job');

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function validateId(id) {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error('Invalid job ID.');
    error.statusCode = 400;
    throw error;
  }
}

function validateBody(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    const error = new Error('Request body must be a JSON object.');
    error.statusCode = 400;
    throw error;
  }
}

async function getJobs(req, res, next) {
  try {
    const filter = {};
    const { search, category, location } = req.query;
    const filterValues = { search, category, location };

    for (const [name, value] of Object.entries(filterValues)) {
      if (value !== undefined && (typeof value !== 'string' || value.length > 100)) {
        return res.status(400).json({
          success: false,
          message: `${name} must be a text value no longer than 100 characters.`
        });
      }
    }

    if (search) {
      const searchPattern = new RegExp(escapeRegex(search), 'i');
      filter.$or = [{ jobTitle: searchPattern }, { company: searchPattern }];
    }
    if (category) filter.category = new RegExp(`^${escapeRegex(category)}$`, 'i');
    if (location) filter.location = new RegExp(escapeRegex(location), 'i');

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
}

async function getJobById(req, res, next) {
  try {
    validateId(req.params.id);
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found.' });
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
}

async function createJob(req, res, next) {
  try {
    validateBody(req.body);
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
}

async function updateJob(req, res, next) {
  try {
    validateId(req.params.id);
    validateBody(req.body);
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found.' });
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
}

async function deleteJob(req, res, next) {
  try {
    validateId(req.params.id);
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found.' });
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
}

async function getJobCount(req, res, next) {
  try {
    const count = await Job.countDocuments();
    res.status(200).json({ success: true, data: { count } });
  } catch (error) {
    next(error);
  }
}

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob, getJobCount };
