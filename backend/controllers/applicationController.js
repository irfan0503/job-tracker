const mongoose = require('mongoose');
const Application = require('../models/Application');

const allowedStatuses = ['Applied', 'Interview', 'Selected', 'Rejected'];

function validateId(id) {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error('Invalid application ID.');
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

async function getApplications(req, res, next) {
  try {
    const filter = {};
    if (req.query.status) {
      if (!allowedStatuses.includes(req.query.status)) {
        return res.status(400).json({
          success: false,
          message: `Status must be one of: ${allowedStatuses.join(', ')}.`
        });
      }
      filter.status = req.query.status;
    }

    const applications = await Application.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    next(error);
  }
}

async function getApplicationById(req, res, next) {
  try {
    validateId(req.params.id);
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found.' });
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
}

async function createApplication(req, res, next) {
  try {
    validateBody(req.body);
    const application = await Application.create(req.body);
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
}

async function updateApplication(req, res, next) {
  try {
    validateId(req.params.id);
    validateBody(req.body);
    const application = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!application) return res.status(404).json({ success: false, message: 'Application not found.' });
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
}

async function deleteApplication(req, res, next) {
  try {
    validateId(req.params.id);
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found.' });
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
}

async function getApplicationCount(req, res, next) {
  try {
    const count = await Application.countDocuments();
    res.status(200).json({ success: true, data: { count } });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplicationCount
};
