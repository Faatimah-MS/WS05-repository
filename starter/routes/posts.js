const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/Post');

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post('/', async (req, res) => {
  // TODO: Create a new Post instance from req.body.
  const { title, content, author } = req.body;
  const post = new Post({ title,
    content,
    author});
  // TODO: Save it to MongoDB.
  // TODO: Return the created post with status code 201. 

  if (!title || !content || !author){
    return res.status(400).json({ message: 'validation failed' });
  }

  await post.save();
  if (post) {
  return res.status(201).json(post);
  } 
});

router.get('/', async (req, res) => {
  // TODO: Query all posts from MongoDB.
  const posts = await Post.find();
  // TODO: Return the results as JSON.
  if (posts) {
  return res.status(200).json(posts);
  }
});

router.get('/:id', async (req, res) => {
  // TODO: Validate req.params.id using isValidObjectId().
  // TODO: Find one post by id.
  // TODO: Return 404 if the post is not found.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }
    const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

 if (post){
  return res.status(200).json(post);
 }
});

router.put('/:id', async (req, res) => {
  // TODO: Validate req.params.id using isValidObjectId().
  // TODO: Update the post with req.body.
  // TODO: Return the updated post as JSON.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }
   const post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  return res.status(200).json(post);

});

router.delete('/:id', async (req, res) => {
  // TODO: Validate req.params.id using isValidObjectId().
  // TODO: Delete the post by id.
  // TODO: Return a success message as JSON.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  return res.status(200).json({
    message: 'Post deleted successfully'
  });
});

module.exports = router;