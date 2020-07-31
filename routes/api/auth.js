const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Gets header with token and returns user info
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    // retrieve all user fields except password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({msg: 'Server error'});
  }
});

// @route   POST api/auth
// @desc    Login
// @access  Public
router.post('/',
  [
    body('email','Please include a valid email').isEmail().normalizeEmail(),
    body('password','Please enter a password with 6 or more characters').isLength({min:6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors })
      }
      const {email, password} = req.body;

      // find user in db
      const user = await User.findOne({email});
      if (!user) {
        // Identical messages for security purpose
        return res.status(401).json({errors: [{msg: 'Invalid credentials'}]});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ errors: [{msg: 'Invalid credentials'}] });
      }
      const token = await user.generateToken();
      res.status(200).json({token});
    }catch (e) {
      console.error(e);
      res.status(500).json({msg: 'Server error'});
    }
  }
);

module.exports = router;