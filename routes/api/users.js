const express = require('express')
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public


router.post('/',
  [
    // fields validation
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please include a valid email'),
    check('email').isLength({min: 6}).withMessage('Please enter a password with 6 or more characters')
  ],
  async (req, res) => {

    // return code 400 if isn't valid
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    try {
      // check if user exists
      let user = await User.findOne({email});
      if(user) {
        // return coz we have res.send in the end and will have conflict
        return res.status(400).json({ errors: []})
      }

      // encrypt password (hash)
      const salt = bcrypt.genSaltSync(10);
      const encryptedPassword = bcrypt.hashSync(password, salt);

      // get image from gravatar
      const gravatarUrl = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({name, email, password: encryptedPassword, avatar: gravatarUrl});

      // save user to get id to token
      await user.save((err,savedUser) => {
        if(err) throw err;
        console.log(`User saved ${savedUser}`);
      });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get('jwtSecret'),{expiresIn: 360000}, (err,token) => {
        if(err) throw err;
        res.json({token});
      });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });

module.exports = router;