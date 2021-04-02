// Imports
const express = require("express");
const postsCtrl = require("../controllers/posts");
const auth = require('../middleware/auth');

// Router
exports.router = (() => {
    let postsRouter = express.Router();

    // Routes assignations
    postsRouter.post("/posts", postsCtrl.createPost);
    postsRouter.get("/posts", postsCtrl.listPosts);
    postsRouter.get("/posts/:id", postsCtrl.onePost);
    postsRouter.put("/posts/:id", postsCtrl.modifyPost);
    postsRouter.delete("/posts/:id", postsCtrl.deletePost);

    return postsRouter;
})();