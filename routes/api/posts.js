const express = require('express')
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const {body, validationResult} = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');

// Adding posts, likes, comments

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [
    authMiddleware,
    [
      body('text', 'Text is required').notEmpty()
    ]
  ],
  async (req, res) => {
    const {errors} = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    try {
      const user = await User.findById(req.user.id).select('-password')

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      await newPost.save();
      const posts = await Post.find().sort({date: -1});

      res.status(201).json(posts);
    } catch (e) {
      res.status(500).json([{msg: `Server error. ${e.message}`}])
    }
  })

// @route   GET api/posts
// @desc    Retrieve info about all posts
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    // sort from most recent
    const posts = await Post.find().sort({date: -1});
    await res.json(posts);
  } catch (e) {
    res.status(500).json([{msg: `Server error. ${e.message}`}])
  }
})

// @route   GET api/posts/:post_id
// @desc    Get post by id
// @access  Private
router.get('/:post_id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json([{msg: "Post not found"}]);
    }

    res.json(post);
  } catch (e) {
    // wrong format of id
    if (e.kind === 'ObjectId') {
      return res.status(404).json([{msg: 'Post not found'}]);
    }
    res.status(500).json([{msg: `Server error. ${e.message}`}])
  }
})

// @route   DELETE api/posts/:post_id
// @desc    Delete post by id
// @access  Private
router.delete('/:post_id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json([{msg: "Post not found"}]);
    }

    if (post.user.toString() !== req.user.id) {
      // 401 - not authorized
      return res.status(401).json([{msg: "User not authorized"}]);
    }
    await post.remove();
    const posts = await Post.find().sort({date: -1});
    await res.json(posts);
  } catch (e) {
    // wrong format of id
    if (e.kind === 'ObjectId') {
      return res.status(404).json([{msg: 'Post not found'}]);
    }
    res.status(500).json([{msg: `Server error. ${e.message}`}])
  }
})


// @route   PUT api/posts/like/:post_id
// @desc    Like a post
// @access  Private
router.put('/like/:post_id', authMiddleware, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json([{msg: "Post not found"}]);
    }

    // Check if the post has already been liked
    if (post.likes.find(el => el.user.toString() === req.user.id)) {
      return res.status(400).json([{msg: "Post already liked"}]);
    }

    // Like
    post.likes.unshift({user: req.user.id});
    post = await post.save();
    await res.json(post.likes);
  } catch (e) {
    // wrong format of id
    if (e.kind === 'ObjectId') {
      return res.status(404).json([{msg: 'Post not found'}]);
    }
    res.status(500).json([{msg: `Server error. ${e.message}`}]);
  }
})

// @route   PUT api/posts/unlike/:post_id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:post_id', authMiddleware, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({msg: "Post not found"});
    }

    // Check if the post has already been liked
    const postIndex = post.likes.findIndex(like => like.user.toString() === req.user.id);

    if (postIndex === -1) {
      return res.status(400).json([{msg: "Post has not been liked "}]);
    }
    // Remove like
    post.likes.splice(postIndex, 1);
    post = await post.save();
    await res.json(post.likes);
  } catch (e) {
    // wrong format of id
    if (e.kind === 'ObjectId') {
      return res.status(404).json([{msg: 'Post not found'}]);
    }
    res.status(500).json([{msg: `Server error. ${e.message}`}])
  }
})

// @route   POST api/posts/comment/:post_id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:post_id',
  [
    authMiddleware,
    [body('text', 'Text is required').notEmpty()]
  ], async (req, res) => {
    try {
      const {errors} = validationResult(req);
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const user = await User.findById(req.user.id);
      let post = await Post.findById(req.params.post_id);

      if (!post) {
        return res.status(404).json({msg: "Post not found"});
      }

      // If reached limit of comments (10)
      if (post.comments.length > 9) {
        return res.status(400).json([{msg: "Reached limit of comments (10 comments per post)"}]);
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
      // wrong format of id
      if (e.kind === 'ObjectId') {
        return res.status(404).json([{msg: 'Post not found'}]);
      }
      res.status(500).json([{msg: `Server error. ${e.message}`}])
    }
  })

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Uncomment a post
// @access  Private
router.delete('/comment/:post_id/:comment_id', authMiddleware, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json([{msg: "Post not found"}]);
    }

    // Find comment index
    const commentIndex = post.comments
      .findIndex(cmnt => cmnt.user.toString() === req.user.id && cmnt._id.toString() === req.params.comment_id);

    if (commentIndex === -1) {
      return res.status(400).json([{msg: "Comment to delete not found"}]);
    }

    post.comments.splice(commentIndex, 1);
    post = await post.save();
    await res.json(post.comments);
  } catch (e) {
    // wrong format of id
    if (e.kind === 'ObjectId') {
      return res.status(404).json([{msg: 'Post not found'}]);
    }
    res.status(500).json([{msg: `Server error. ${e.message}`}])
  }
})

module.exports = router;