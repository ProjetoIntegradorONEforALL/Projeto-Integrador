const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Login endpoint
router.post('/login', async (req, res) => {
  console.log('Endpoint /login acessado');
  try {
    console.log(req.body);
    const { username, password } = req.body;

    // TODO: Implement proper user authentication
    // This is a placeholder for demonstration
    if (username !== 'admin' || password !== 'admin123') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: 1, username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      status: 'success',
      data: {
        token,
        user: {
          id: 1,
          username,
          role: 'admin'
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Authentication failed'
    });
  }
});

// Verify token endpoint
router.get('/verify', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      status: 'success',
      data: {
        valid: true,
        user: decoded
      }
    });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }
});

module.exports = router; 