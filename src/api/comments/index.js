import { Comment } from "./model.js"
import q2m from "query-to-mongo"
import express from "express"
const commentsRouter = express.Router();

// Get all comments for the specified blog post
function getCommentsFromDb(blogPostId) {
  return Comment.find({ blogPostId });
}

// Get a single comment for the specified blog post
function getCommentFromDb(blogPostId, commentId) {
  return Comment.findById(commentId);
}

// Save a new comment for the specified blog post
function saveCommentToDb(blogPostId, comment) {
  const newComment = new Comment({
    blogPostId,
    ...comment
  });
  return newComment.save().catch(err => console.log(err))
}

// Update a comment for the specified blog post
function updateCommentInDb(blogPostId, commentId, comment) {
  return Comment.findByIdAndUpdate(commentId, comment, { new: true }).catch(err => console.log(err))
}

// Delete a comment for the specified blog post
function deleteCommentFromDb(blogPostId, commentId) {
return Comment.findByIdAndDelete(commentId).catch(err => console.log(err))
}

// GET /blogPosts/:id/comments => returns all the comments for the specified blog post
commentsRouter.get('/posts/:postId/comments', async (req, res) => {
const blogPostId = req.params.postId;
// Get all comments for the specified blog post from your database
const comments = await getCommentsFromDb(blogPostId);
res.json(comments);
});

// GET /blogPosts/:id/comments/:commentId => returns a single comment for the specified blog post
commentsRouter.get('/posts/:postId/comments/:commentId', async (req, res) => {
const blogPostId = req.params.postId;
const commentId = req.params.commentId;
// Get the specified comment for the specified blog post from your database
const comment = await getCommentFromDb(blogPostId, commentId);
res.json(comment);
});

// POST /blogPosts/:id => adds a new comment for the specified blog post
commentsRouter.post('/posts/:postId/comments', async (req, res) => {
const blogPostId = req.params.postId;
const comment = req.body;
// Save the new comment to your database
await saveCommentToDb(blogPostId, comment);
res.json({ message: 'Comment added successfully' });
});

// PUT /blogPosts/:id/comments/:commentId => edit the comment belonging to the specified blog post
commentsRouter.put('/posts/:postId/comments/:commentId', async (req, res) => {
const blogPostId = req.params.postId;
const commentId = req.params.commentId;
const comment = req.body;
// Update the specified comment in your database
await updateCommentInDb(blogPostId, commentId, comment);
res.json({ message: 'Comment updated successfully' });
});

// DELETE /blogPosts/:id/comments/:commentId => delete the comment belonging to the specified blog post
commentsRouter.delete('/posts/:postId/comments/:commentId', async (req, res) => {
const blogPostId = req.params.postId;
const commentId = req.params.commentId;
// Delete the specified comment from your database
await deleteCommentFromDb(blogPostId, commentId);
res.json({ message: 'Comment deleted successfully' });
});

export default commentsRouter
