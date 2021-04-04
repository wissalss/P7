// Imports
const express = require("express");
const usersCtrl = require("../controllers/user");
const auth = require('../utils/jwt.utils');
// Router
exports.router = (() => {
    let usersRouter = express.Router();

    // Routes assignations
    usersRouter.post("/auth/signup", usersCtrl.signup);
    usersRouter.post("/auth/login", usersCtrl.login);
    usersRouter.get("/auth", usersCtrl.allUsers);
    usersRouter.get("/auth/:id", usersCtrl.profile);
    usersRouter.put("/auth/:id", usersCtrl.updateProfile);
    usersRouter.delete("/auth/:id", usersCtrl.deleteProfile);


    return usersRouter;
})();