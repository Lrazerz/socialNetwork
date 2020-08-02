const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const {body, validationResult} = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Returns current user info
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    // retrieve all user fields but password
    const user = await User.findById(req.user.id).select('-password');
    if(!user) {
      return res.status(404).json([{msg: 'User not found'}]);
    }
    res.json(user);
  } catch (e) {
    res.status(500).json([{msg: `Server error. ${e.message}`}]);
  }
});

// @route   POST api/auth/signup
// @desc    Register User
// @access  Public
router.post('/signup',
  [
    // fields validation
    body('name','Name is required').notEmpty(),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({min: 6}).withMessage('Please enter a password with 6 or more characters')
  ],
  async (req, res) => {
    const {errors} = validationResult(req);
    if(errors.length > 0) {
      return res.status(400).json(errors);
    }
    try {
      const {name, email, password} = req.body;
      // check if user exists
      let user = await User.findOne({email});
      if(user) {
        // return coz we have res.send in the end and will be conflict
        return res.status(400).json([{msg: 'User already exists'}])
      }

      // get image from gravatar
      const gravatarUrl = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({name, email, password, avatar: gravatarUrl});

      // hash password with bcrypr, generate token
      await user.hashPassword();
      await user.save();
      const token = await user.generateToken();
      res.status(201).json({token});
    } catch (e) {
      res.status(500).json([{msg: `Server error. ${e.message}`}])
    }
  });

// @route   POST api/auth/signin
// @desc    Login User
// @access  Public
router.post('/signin',
  [
    body('email','Please input a valid email').isEmail().normalizeEmail(),
    body('password','Please input a password').notEmpty()
  ],
  async (req, res) => {
    try {
      const {errors} = validationResult(req);
      if(errors.length > 0) {
        return res.status(400).json(errors);
      }
      const {email, password} = req.body;

      const user = await User.findOne({email});
      if (!user) {
        // Identical messages for security purpose
        return res.status(401).json([{msg: 'Invalid credentials'}]);
      }
      // check if passwords match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json([{msg: 'Invalid credentials'}]);
      }
      // generate and save token
      const token = await user.generateToken();
      res.status(200).json({token});
    }catch (e) {
      res.status(500).json([{msg: `Server error. ${e.message}`}]);
    }
  }
);

module.exports = router;