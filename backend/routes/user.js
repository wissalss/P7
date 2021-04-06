// Imports
const express = require("express");
const usersCtrl = require("../controllers/user");
const auth = require('../middleware/auth');
// Router
exports.router = (() => {
    let usersRouter = express.Router();

    // Routes assignations
    usersRouter.post("/auth/signup", usersCtrl.signup);
    usersRouter.post("/auth/login", usersCtrl.login);
    usersRouter.get("/auth/:id", auth, usersCtrl.profile);
    usersRouter.delete("/auth/:id", usersCtrl.deleteProfile);


    return usersRouter;
})();