const express = require('express')
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/',
  [
    // fields validation
    body('name','Name is required').notEmpty(),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({min: 6}).withMessage('Please enter a password with 6 or more characters')
  ],
  async (req, res) => {
    // return code 400 if isn't valid
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }
    try {
      const {name, email, password} = req.body;
      // check if user exists
      let user = await User.findOne({email});
      if(user) {
        // return coz we have res.send in the end and will be conflict
        return res.status(400).json({ errors: [{msg: 'User already exists'}]})
      }

      // get image from gravatar
      const gravatarUrl = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({name, email, password, avatar: gravatarUrl});

      await user.hashPassword();
      await user.save();
      const token = await user.generateToken();
      res.status(201).json({token});
    } catch (e) {
      console.error(e);
      res.status(500).json({msg: 'Server error'})
    }
  });

module.exports = router;