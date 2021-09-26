var express = require("express");
var router = express.Router();
const validate = require("../config/validate");
const db = require("../models/index");
const Post = db.post;

/* GET home page. */

router.post("/", validate.isLoggedin, validate.validatePost, function (req, res) {
        Post.create({
            title: req.body.title,
            contents: req.body.contents,
            userUsername: req.decoded.username,
            // 포스트 생성 시 username 같이 저장
        }).then(function (createPost) {
            return res.status(200).json({ result: true, msg: "Post create Successful!" });
        });
    }
);

router.get("/:postId", validate.isLoggedin, async function (req, res) {
    const post = await Post.findByPk(req.params.postId);
    if (post === null) {
      return res.status(400).json({ result: false, msg: "Post not found!"});
    } else {
      return res.status(200).json(post);
    }
});

router.put("/:postId", validate.isLoggedin, validate.validatePost, async function (req, res) {

  const post = await Post.findByPk(req.params.postId);
  if (post.userUsername === req.decoded.username) {
    await Post.update({ title: req.body.title, contents: req.body.contents },{
      where: { id: req.params.postId }
    });
    return res.status(200).json({ result: true, msg: "Post update successful!"});
  } else {
    return res.status(400).json({ result: false, msg: "User is not authorized to update this post!"})
  }
});

router.delete("/:postId", validate.isLoggedin, async function (req, res) {

  const post = await Post.findByPk(req.params.postId);
  if (post.userUsername === req.decoded.username) {
    await Post.destroy({ where: { id: req.params.postId }});
    return res.status(200).json({ result: true, msg: "Post delete successful!" });
  } else {
    return res.status(400).json({ result: false, msg: "User is not authorized to delete this post!"})
  }

});

router.get("/", validate.isLoggedin, async function (req, res) {
    const postList = await Post.findAll();
    return res.status(200).json(postList);
});

module.exports = router;
