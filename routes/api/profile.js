const express = require('express')
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const {check, validationResult} = require('express-validator');
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
      return res.status(400).json({msg: "There is no profile for this user"});
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

    if (!profile) return res.status(404).json({msg: "Profile not found"});

    res.json(profile);

  } catch (e) {
    console.error(e);
    // wrong format of id
    if (e.kind === 'ObjectId') {
      res.status(404).json({msg: "Profile not found"});
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

// @route   DELETE api/profile/
// @desc    Delete current user (profile and posts too)
// @access  Public
// todo maybe transfer to api/users.js
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await Profile.findOneAndDelete({user: req.user.id});
    await Post.findOneAndDelete({user: req.user.id});
    const user = await User.findOneAndDelete({_id: req.user.id});
    if(!user) {
      return res.status(404).json({msg: "User not found"});
    }
    res.json({msg: "User successfully deleted"})
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
})

// @route   PUT api/profile/experience
// @desc    Put experience to current users profile
// @access  Private
router.put('/experience',
  [authMiddleware,
    [
      check('title').notEmpty().withMessage('Title is required'),
      check('company').notEmpty().withMessage('Company is required'),
      check('from').notEmpty().withMessage('From is required')
    ]
  ],async (req, res) => {
  const errors = validationResult(req);
  if(errors.length > 0) {
    // todo always errors instead of errors: errors.array()
    return res.status(400).json({errors: errors.array()});
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

    // alter experience array
    profile.experience.unshift(newExp);

    await profile.save();

    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
})

// technically it can be a put, coz we updating, but we deleting too
// all objects have uniq id
// @route   DELETE api/profile/experiences/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', authMiddleware,async (req,res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});
    // Get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
    // delete 1 item from the index
    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile)
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
})

// @route   PUT api/profile/education
// @desc    Put education to current users profile
// @access  Private
router.put('/education',
  [authMiddleware,
    [
      check('school').notEmpty().withMessage('School is required'),
      check('degree').notEmpty().withMessage('Degree is required'),
      check('fieldofstudy').notEmpty().withMessage('Field of study is required'),
      check('from').notEmpty().withMessage('From is required')
    ]
  ],async (req, res) => {
    const errors = validationResult(req);
    if(errors.length > 0) {
      // todo always errors instead of errors: errors.array()
      return res.status(400).json({errors: errors.array()});
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

      res.json(profile);
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server error');
    }
  })

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', authMiddleware,async (req,res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});
    // Get remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
    // delete 1 item from the index
    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.json(profile)
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
})

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', (req,res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
      sort=created:asc&client_id=${config.get('githubClientId')}&
      client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: {'user-agent': 'node.js'}
    }

    request(options, (error,response,body) => {
      if(error) console.error(error);

      if(response.statusCode !== 200) {
        return res.status(404).json({msg: 'No Github profile found'});
      }

      res.json(body)
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;