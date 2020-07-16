const express = require('express')
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// Adding posts, likes, comments

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/',
  [
    authMiddleware,
    [
      check('text').notEmpty().withMessage('Text is required')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
    try {
      const user = await User.findById(req.user.id).select('-password')

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (e) {
      console.error(e);
      res.status(500).send('Server error');
    }
  }
)

// @route   GET api/posts
// @desc    Retrieve info about all posts
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    // sort from most recent
    const posts = await Post.find().sort({ date: -1 });
    await res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
})

// @route   GET api/posts/:post_id
// @desc    Get post by id
// @access  Private
router.get('/:post_id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if(!post) {
      return res.status(404).json({msg: "Post not found"});
    }

    await res.json(post);
  } catch (e) {
    console.error(e.message);
    // wrong format of id
    if(e.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Post not found'});
    }
    res.status(500).send('Server error');
  }
})

// @route   DELETE api/posts/:post_id
// @desc    Delete post by id
// @access  Private
router.delete('/:post_id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if(!post) {
      return res.status(404).json({msg: "Post not found"});
    }

    if(post.user.toString() !== req.user.id) {
      // 401 - not authorized
      return res.status(401).json({msg: "User not authorized"});
    }

    await post.remove();

    await res.json({msg: "Post successfully deleted"});
  } catch (e) {
    console.error(e.message);
    // wrong format of id
    if(e.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Post not found'});
    }
    res.status(500).send('Server error');
  }
})


// @route   PUT api/posts/like/:post_id
// @desc    Like a post
// @access  Private
router.put('/like/:post_id', authMiddleware, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);
    if(!post) {
      return res.status(404).json({msg: "Post not found"});
    }

    // Check if the post has already been liked
    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({msg: "Post already liked"});
    }

    // Like
    post.likes.unshift({user: req.user.id});

    post = await post.save();

    await res.json(post.likes);
  } catch (e) {
    console.error(e.message);
    // wrong format of id
    if(e.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Post not found'});
    }
    res.status(500).send('Server error');
  }
})

// @route   PUT api/posts/unlike/:post_id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:post_id', authMiddleware, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);
    if(!post) {
      return res.status(404).json({msg: "Post not found"});
    }

    // Check if the post has already been liked
    const postIndex = post.likes.findIndex(like => like.user.toString() === req.user.id);

    if(postIndex === -1) {
      return res.status(400).json({msg: "Post has not been liked "});
    }
    post.likes.splice(postIndex,1);

    post = await post.save();

    await res.json(post.likes);
  } catch (e) {
    console.error(e.message);
    // wrong format of id
    if(e.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Post not found'});
    }
    res.status(500).send('Server error');
  }
})

// @route   POST api/posts/comment/:post_id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:post_id',
  [authMiddleware, [check('text').notEmpty().withMessage('Text is required')]],
  async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let post = await Post.findById(req.params.post_id);

    if(!post) {
      return res.status(404).json({msg: "Post not found"});
    }

    const commentIndex = post.comments
      .findIndex(cmnt => cmnt.user.toString() === req.user.id);

    // if already commented
    if(commentIndex !== -1) {
      return res.status(400).json({msg: "Already commented"});
    }

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    post.comments.unshift(newComment);

    post = await post.save();

    await res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    // wrong format of id
    if(e.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Post not found'});
    }
    res.status(500).send('Server error');
  }
})

// @route   DELETE api/posts/comment/:post_id
// @desc    Uncomment a post
// @access  Private
router.delete('/comment/:post_id', authMiddleware, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);
    if(!post) {
      return res.status(404).json({msg: "Post not found"});
    }

    // Check if the post has already been commented
    const postIndex = post.comments.findIndex(cmnt => cmnt.user.toString() === req.user.id);

    if(postIndex === -1) {
      return res.status(400).json({msg: "Post has not been commented "});
    }
    post.comments.splice(postIndex,1);

    post = await post.save();

    await res.json(post.likes);
  } catch (e) {
    console.error(e.message);
    // wrong format of id
    if(e.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Post not found'});
    }
    res.status(500).send('Server error');
  }
})

module.exports = router;