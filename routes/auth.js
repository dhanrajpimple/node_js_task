const express = require('express');
const router = express.Router();
const { 
  createEvent, 
  getEvents, 
  updateEvent, 
  deleteEvent 
} = require('../controllers/eventController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, adminMiddleware, createEvent);
router.get('/', getEvents);
router.put('/:id', authMiddleware, adminMiddleware, updateEvent);
router.delete('/:id', authMiddleware, adminMiddleware, deleteEvent);

module.exports = router;