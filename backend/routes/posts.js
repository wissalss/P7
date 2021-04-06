// Imports
const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts");
const auth = require('../middleware/auth');
const multer = require("../middleware/multer-config");

// Routes assignations
router.post("/posts", multer, postsCtrl.createPost);
router.get("/posts", postsCtrl.listPosts);
router.put("/posts/:id", multer, postsCtrl.modifyPost);
router.delete("/posts/:id", postsCtrl.deletePost);

module.exports = router;