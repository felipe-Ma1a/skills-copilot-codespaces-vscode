// Create web server
const express = require("express");
const app = express();
const port = 3000;

// Parse request body
app.use(express.json());

// Import comments data
const comments = require("./comments.json");

// Route to get all comments
app.get("/comments", (req, res) => {
  res.json(comments);
});

// Route to get comment by id
app.get("/comments/:id", (req, res) => {
  const commentId = req.params.id;
  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );
  if (!comment) {
    res.status(404).send("The comment with the given ID was not found.");
  }
  res.json(comment);
});

// Route to add new comment
app.post("/comments", (req, res) => {
  const comment = {
    id: comments.length + 1,
    text: req.body.text,
  };
  comments.push(comment);
  res.status(201).json(comment);
});

// Route to update comment by id
app.put("/comments/:id", (req, res) => {
  const commentId = req.params.id;
  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );
  if (!comment) {
    res.status(404).send("The comment with the given ID was not found.");
  }
  comment.text = req.body.text;
  res.json(comment);
});

// Route to delete comment by id
app.delete("/comments/:id", (req, res) => {
  const commentId = req.params.id;
  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );
  if (!comment) {
    res.status(404).send("The comment with the given ID was not found.");
  }
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.json(comment);
});

// Start web server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
