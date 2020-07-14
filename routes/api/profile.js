const express = require('express')
const router = express.Router();
const Profile = require('../../models/Profile');
const {check, validationResult} = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const normalizeUrl = require('normalize-url');

// @route   GET api/profile
// @desc    Retrieve info about all profiles
// @access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    return res.json(profiles);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
})

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private

router.get('/me', authMiddleware, async (req, res) => {
  try {
    // poopulate result with fields from user model (will be user: {name:...,avatar:...} as field)
    const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({msg: 'There is no profile for this user'});
    }

    res.json(profile);
  } catch (e) {
    console.error(e);
    res.status(500).send('Server error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id})
      .populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({msg: 'Profile not found'});

    res.json(profile);

  } catch (e) {
    console.error(e);
    if(e.kind === 'ObjectId') {
      res.status(400).json({msg: 'Profile not found'});
    }
    res.status(500).send('Server error');
  }
})

// @route   POST api/profile
// @desc    Create or update profile
// @access  Private

router.post('/',
  [
    authMiddleware,
    [
      check('status').notEmpty().withMessage('Status is required'),
      check('skills').notEmpty().withMessage('Skills is required'),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // build profile fields object
    const profileFields = {
      user: req.user.id,
      company,
      location,
      bio,
      status,
      githubusername,
      website: website && website !== '' ? normalizeUrl(website, {forceHttps: true}) : '',
      skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim())
    };

    // build social object
    const socialFields = {
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    };

    // normalize urls and add to profileFields
    for (key in socialFields) {
      if (socialFields[key] && socialFields[key].length > 0) {
        socialFields[key] = normalizeUrl(socialFields[key], {forceHttps: true});
      }
    }

    profileFields.social = socialFields;

    try {
      let profile = await Profile.findOne({user: req.user.id});
      if (profile) {
        // update if profile exists
        profile = await Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
        );
        return res.json(profile);
      }

      // if profile not found
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);

    } catch (e) {
      console.error(e);
      res.status(500).send('Server error');
    }
  }
)

module.exports = router;