const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cache = require('../services/cache');

// List all actuators
router.get('/', auth, async (req, res) => {
  try {
    const cacheKey = 'actuators:list';
    const cachedData = await cache.get(cacheKey);
    
    if (cachedData) {
      return res.json(cachedData);
    }

    // TODO: Implement actuator listing logic
    const actuators = [
      { id: 1, type: 'relay', location: 'room1', status: 'off' },
      { id: 2, type: 'pwm', location: 'room2', status: 'on', value: 75 }
    ];

    await cache.set(cacheKey, actuators, 300); // Cache for 5 minutes
    res.json(actuators);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch actuators'
    });
  }
});

// Get actuator status
router.get('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `actuator:${id}:status`;
    const cachedData = await cache.get(cacheKey);
    
    if (cachedData) {
      return res.json(cachedData);
    }

    // TODO: Implement status fetching logic
    const status = {
      id,
      status: 'on',
      value: 75,
      lastUpdated: new Date()
    };

    await cache.set(cacheKey, status, 30); // Cache for 30 seconds
    res.json(status);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch actuator status'
    });
  }
});

// Control actuator
router.post('/:id/control', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { action, value } = req.body;

    // TODO: Implement actuator control logic
    const result = {
      id,
      action,
      value,
      status: 'success',
      timestamp: new Date()
    };

    // Invalidate cache
    await cache.del(`actuator:${id}:status`);
    await cache.del('actuators:list');

    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to control actuator'
    });
  }
});

module.exports = router; 