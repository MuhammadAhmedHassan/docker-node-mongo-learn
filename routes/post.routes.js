const express = require("express");
const {
  getAllPosts,
  createPost,
  getOnePost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");
const { protect } = require("../middlewares/auth.middlewares");

const router = express.Router();

// localhost:3000/
router.route("/posts").all(protect).get(getAllPosts).post(createPost);

// localhost:3000/:id
router.route("/posts/:id").all(protect).get(getOnePost).patch(updatePost).delete(deletePost);

module.exports = { router, postRouter: router };
