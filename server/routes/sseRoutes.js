const express = require('express');
const { sseHandler } = require('../controllers/sseController');

const router = express.Router();

// SSE route
router.get('/', sseHandler);

module.exports = router;
