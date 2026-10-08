const express = require('express');
const {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplicationCount
} = require('../controllers/applicationController');

const router = express.Router();

router.get('/count', getApplicationCount);
router.route('/').get(getApplications).post(createApplication);
router.route('/:id').get(getApplicationById).put(updateApplication).delete(deleteApplication);

module.exports = router;
