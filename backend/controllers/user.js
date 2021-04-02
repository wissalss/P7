// Imports
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const models = require("../models");
const asyncLib = require("async");
const jwtUtils = require("../utils/jwt.utils");

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

//Controllers
module.exports = {
    signup: (req, res) => {
        // Parameters
        let email = req.body.email;
        let password = req.body.password;
        let userName = req.body.userName;
        let isAdmin = "";

        if (email == null || userName == null || password == null) {
            return res.status(400).json({ error: "missing parameters" });
        }

        if (userName.length >= 21 || userName.length <= 2) {
            return res
                .status(400)
                .json({ error: "wrong username (must be length 3 - 20)" });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "email is not valid" });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: "password not valid (must lenght 8 - 20 and include 1 number and 1 uppercase",
            });
        }

        if (req.body.email === "wissal@groupomania.com") { isAdmin = true; } else { isAdmin = false; }

        asyncLib.waterfall(
            [
                (done) => {
                    models.User.findOne({
                            attributes: ["email"],
                            where: { email: email },
                        })
                        .then((userFound) => {
                            done(null, userFound);
                        })
                        .catch((err) => {
                            return res.status(500).json({ error: "unable to verify user" });
                        });
                },
                (userFound, done) => {
                    if (!userFound) {
                        bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                            done(null, userFound, bcryptedPassword);
                        });
                    } else {
                        return res.status(409).json({ error: "user already exist" });
                    }
                },
                (userFound, bcryptedPassword, done) => {
                    let newUser = models.User.create({
                            email: email,
                            password: bcryptedPassword,
                            userName: userName,
                            isAdmin: isAdmin,
                        })
                        .then((newUser) => {
                            done(newUser);
                        })
                        .catch((err) => {
                            return res.status(500).json({ error: "cannot add user" });
                        });
                },
            ],
            (newUser) => {
                if (newUser) {
                    return res.status(201).json({
                        userId: newUser.id,
                        userName: newUser.userName,
                    });
                } else { return res.status(500).json({ error: "cannot add user" }); }
            }
        );
    },

    login: (req, res) => {
        // Parameters
        let email = req.body.email;
        let password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ error: "missing parameters" });
        }

        asyncLib.waterfall(
            [
                (done) => {
                    models.User.findOne({
                            where: { email: email },
                        })
                        .then((userFound) => {
                            done(null, userFound);
                        })
                        .catch((err) => {
                            return res.status(500).json({ error: "unable to verify user" });
                        });
                },
                (userFound, done) => {
                    if (userFound) {
                        bcrypt.compare(
                            password,
                            userFound.password,
                            (errBcrypt, resBcrypt) => {
                                done(null, userFound, resBcrypt);
                            }
                        );
                    } else {
                        return res
                            .status(404)
                            .json({ error: "user does not exist in the database" });
                    }
                },
                (userFound, resBcrypt, done) => {
                    if (resBcrypt) {
                        done(userFound);
                    } else {
                        return res.status(403).json({ error: "invalid password" });
                    }
                },
            ],
            (userFound) => {
                if (userFound) {
                    return res.status(200).json({
                        userId: userFound.id,
                        userName: userFound.userName,
                        isAdmin: userFound.isAdmin,
                        token: jwtUtils.generateTokenForUser(userFound),
                    });
                } else {
                    return res.status(500).json({ error: "cannot log on user" });
                }
            }
        );
    },

    // Get Profile 

    profile: (req, res) => {
        models.User.findOne({
                where: { id: req.params.id, },
            })
            .then((user) => res.status(200).json({ user }))
            .catch((err) => res.status(401).json({ err }));
    },

    // Update Profile 

    updateProfile: (req, res) => {
        // Getting auth header
        let headerAuth = req.headers["authorization"];
        let userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0) return res.status(400).json({ error: "wrong token" });
        // Parameters
        let userName = req.body.userName;

        asyncLib.waterfall(
            [
                (done) => {
                    models.User.findOne({
                            attributes: ["id", "userName"],
                            where: { id: userId },
                        })
                        .then((userFound) => {
                            done(null, userFound);
                        })
                        .catch((err) => {
                            return res.status(500).json({ error: "unable to verify user" });
                        });
                },
                (userFound, done) => {
                    if (userFound) {
                        userFound
                            .update({
                                userName: userName ? userName : userFound.userName,
                            })
                            .then(() => {
                                done(userFound);
                            })
                            .catch((err) => {
                                res.status(500).json({ error: "cannot update user" });
                            });
                    } else {
                        res.status(404).json({ error: "user not found" });
                    }
                },
            ],
            (userFound) => {
                if (userFound) {
                    return res.status(201).json(userFound);
                } else {
                    return res.status(500).json({ error: "cannot update user profile" });
                }
            }
        );
    },

    //Find One User 

    allUsers: (req, res) => {
        models.User.findAll()
            .then((users) => { res.status(200).json(users); })
            .catch((error) => { res.status(400).json({ error: error }); });
    },

    // Delete Profile 

    deleteProfile: (req, res) => {
        try {
            models.User.destroy({
                where: {
                    id: Number(req.params.id)
                }
            })
            return res.status(200).send({
                message: "Utilisateur supprimé"
            })
        } catch (err) {
            return res.status(500).json({
                err
            });
        }
    }
};