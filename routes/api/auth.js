const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const {check, validationResult} = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET api/auth
// @desc    gets header with token and returns user info
// @access  Private

router.get('/', authMiddleware, async (req, res) => {
  try {
    // retrieve all user fields except password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send({msg: 'Server error'});
  }
});

// @route   POST api/auth
// @desc    login
// @access  Private

router.post('/',
  [
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password').notEmpty().withMessage('Please include a password'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
      }
      const {email, password} = req.body;

      // find user in db
      const user = await User.findOne({email});
      if (!user) {
        // Identical messages for security purpose
        return res.status(401).json({msg: 'Invalid credentials'});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ errors: [{msg: 'Invalid credentials'}] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get('jwtSecret'),{expiresIn: 360000}, (err,token) => {
        if(err) throw err;
        return res.json({token});
      });

    }catch (e) {
      console.error(e);
      res.status(500).send('Server error');
    }
  }
)


module.exports = router;