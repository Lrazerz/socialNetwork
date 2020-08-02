const express = require('express')
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const {body, validationResult} = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const normalizeUrl = require('normalize-url');
const request = require('request');
const config = require('config');

// @route   GET api/profile
// @desc    Retrieve info about all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    await res.json(profiles);
  } catch (e) {
    res.status(500).json([{msg: `Server error. ${e.message}`}])
  }
})

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // poopulate result with fields from user model (will be user: {name:...,avatar:...} as field on profile)
    const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json([{msg: "There is no profile for this user"}]);
    }
    res.status(200).json(profile);
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
    if (!profile) return res.status(404).json([{msg: "Profile not found"}]);

    res.status(200).json(profile);
  } catch (e) {
    // wrong format of id
    if (e.kind === 'ObjectId') {
      res.status(404).json([{msg: "Profile not found"}]);
    }
    res.status(500).json([{msg: `Server error. ${e.message}`}])
  }
})

// @route   POST api/profile
// @desc    Create or update profile
// @access  Private
router.post('/',
  [
    authMiddleware,
    [
      body('status', 'Status is required').notEmpty(),
      body('skills', 'Skills is required').notEmpty()
    ]
  ],
  async (req, res) => {
    const {errors} = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).json(errors);
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
    for (const key in socialFields) {
      if (socialFields[key] && socialFields[key].length > 0) {
        socialFields[key] = normalizeUrl(socialFields[key], {forceHttps: true});
      }
    }

    profileFields.social = socialFields;

    // update if profile exists
    try {
      let profile = await Profile.findOne({user: req.user.id});
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
        );
        return res.json(profile);
      }

      // create if not exists
      profile = new Profile(profileFields);
      await profile.save();
      res.status(201).json(profile);
    } catch (e) {
      res.status(500).json([{msg: `Server error. ${e.message}`}])
    }
  });

// @route   DELETE api/profile/
// @desc    Delete current user (profile and posts too)
// @access  Public
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await Profile.findOneAndDelete({user: req.user.id});
    await Post.deleteMany({user: req.user.id});
    const user = await User.findOneAndDelete({_id: req.user.id});
    if (!user) {
      return res.status(404).json({msg: "User not found"});
    }
    res.json({msg: "User successfully deleted"})
  } catch (e) {
    res.status(500).json([{msg: `Server error. ${e.message}`}])
  }
})

// @route   PUT api/profile/experience
// @desc    Put experience to current users profile
// @access  Private
router.put('/experience',
  [authMiddleware,
    [
      body('title', 'Title is required').notEmpty(),
      body('company', 'Company is required').notEmpty(),
      body('from', 'From is required').notEmpty()
    ]
  ],
  async (req, res) => {
    const {errors} = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    try {
      // get profile
      const profile = await Profile.findOne({user: req.user.id});

      // add experience to array
      profile.experience.unshift(newExp);
      await profile.save();
      res.status(200).json(profile);
    } catch (e) {
      res.status(500).json([{msg: `Server error. ${e.message}`}])
    }
  })

// @route   DELETE api/profile/experiences/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});
    // Find index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
    if (removeIndex === -1) {
      return res.status(404).json([{msg: "Experience not found"}]);
    }
    // delete 1 item from the index
    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.status(200).json(profile);
  } catch (e) {
    res.status(500).json([{msg: `Server error. ${e.message}`}])
  }
})

// @route   PUT api/profile/education
// @desc    Put education to current users profile
// @access  Private
router.put('/education',
  [authMiddleware,
    [
      body('school', 'School is required').notEmpty(),
      body('degree', 'Degree is required').notEmpty(),
      body('fieldofstudy', 'Field of study is required').notEmpty(),
      body('from', 'From is required').notEmpty()
    ]
  ],
  async (req, res) => {
    const {errors} = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    try {
      // get profile
      const profile = await Profile.findOne({user: req.user.id});

      // alter experience array
      profile.education.unshift(newEducation);
      await profile.save();

      res.status(200).json(profile);
    } catch (e) {
      res.status(500).json([{msg: `Server error. ${e.message}`}])
    }
  })

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});
    // Get remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
    // delete 1 item from the index
    if (removeIndex === -1) {
      return res.status(404).json([{msg: 'Education not found'}]);
    }
    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.status(200).json(profile);
  } catch (e) {
    res.status(500).json([{msg: `Server error. ${e.message}`}])
  }
})

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
      sort=created:asc&client_id=${config.get('githubClientId')}&
      client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: {'user-agent': 'node.js'}
    }

    request(options, (error, response, body) => {

      if (response.statusCode !== 200) {
        return res.status(404).json([{msg: 'No Github profile found'}]);
      }

      res.json(body)
    });
  } catch (e) {
    res.status(500).json([{msg: `Server error. ${e.message}`}])
  }
})

module.exports = router;