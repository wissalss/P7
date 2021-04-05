// Imports
const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts");
const auth = require('../middleware/auth');
const multer = require("../middleware/multer-config");

// Routes assignations
router.post("/posts", auth, multer, postsCtrl.createPost);
router.get("/posts", auth, postsCtrl.listPosts);
router.put("/posts/:id", auth, multer, postsCtrl.modifyPost);
router.delete("/posts/:id", auth, postsCtrl.deletePost);

module.exports = router;