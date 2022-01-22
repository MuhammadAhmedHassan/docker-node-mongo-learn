const { Post } = require("../models/post.model");

const internalServerError = (req, res, error) => {
  console.log(error);
  res.status(500).json({ error: "Something went wrong" });
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({
      results: posts.length,
      data: { posts },
    });
  } catch (error) {
    internalServerError(req, res, error);
  }
};

exports.getOnePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({ data: { post } });
  } catch (error) {
    internalServerError(req, res, error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json({ data: { post } });
  } catch (error) {
    internalServerError(req, res);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
 
    res.json({ data: { post } });
  } catch (error) {
    internalServerError(req, res);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
 
    res.sendStatus(204);
  } catch (error) {
    internalServerError(req, res);
  }
};
