const express = require('express');
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobCount
} = require('../controllers/jobController');

const router = express.Router();

router.get('/count', getJobCount);
router.route('/').get(getJobs).post(createJob);
router.route('/:id').get(getJobById).put(updateJob).delete(deleteJob);

module.exports = router;
