// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

// Create an express app
const app = express();

// Use body parser to parse the request body as JSON
app.use(bodyParser.json());

// Use cors to allow cross-origin requests
app.use(cors());

// Create an array to store comments
const commentsByPostId = {};

// Create a route handler for GET /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
  // Return the comments associated with the post id
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a route handler for POST /posts/:id/comments
app.post('/posts/:id/comments', async (req, res) => {
  // Generate an id for the comment
  const commentId = randomBytes(4).toString('hex');

  // Get the content from the request body
  const { content } = req.body;

  // Get the comments associated with the post id
  const comments = commentsByPostId[req.params.id] || [];

  // Add the new comment to the comments array
  comments.push({ id: commentId, content, status: 'pending' });

  // Store the comments array in the comments object
  commentsByPostId[req.params.id] = comments;

  // Send a comment created event to the event bus
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      postId: req.params.id,
      content,
      status: 'pending',
    },
  });

  // Return the comments array
  res.status(201).send(comments);
});

// Create a route handler for POST /events
app.post('/events', async (req, res) => {
  // Get the type and data from the request body
  const { type, data } = req.body;

  // If the type is CommentModerated
  if (type === 'CommentModerated') {
    // Get the id, postId, content and status from the data
    const { id, postId, content, status } = data;

    // Get the comments associated with the postId
    const comments = commentsByPostId[