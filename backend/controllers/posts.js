// Imports
const models = require("../models");
const asyncLib = require("async");
const fs = require('fs');

// Constants
const titleLimit = 2;
const texteLimit = 4;
const itemsLimit = 50;


// Création Post 

module.exports = {
    createPost: function(req, res) {
        // Params
        let title = req.body.title;
        let texte = req.body.texte;

        const post = {
            UserId: req.body.UserId,
            by: req.body.userName,
            title: title,
            texte: texte,
        };
        models.Post.create(post)
            .then((post) => { res.status(201).json(post); })
            .catch((err) => { res.status(500).json({ err }); });
    },

    // Get All Posts 

    listPosts: (req, res) => {
        models.Post.findAll({
                include: [{
                    model: models.Coms,
                    attributes: ["by", "text"],
                }, ],
            })
            .then((posts) => { res.status(200).json(posts); })
            .catch((error) => { res.status(400).json({ error }); });
    },

    // Get One Post 

    onePost: (req, res) => {

        models.Post.findOne({
                where: { id: req.params.id },
                include: [{
                    model: models.User,
                    attributes: ["userName"],
                    model: models.Coms,
                    attributes: ["by", "text"],
                }, ],
            })
            .then((post) => res.status(200).json(post))
            .catch((err) =>
                res.status(404).json({ error })
            );
    },

    // Update Post 

    modifyPost: (req, res) => {
        try {
            models.Post.findOne({
                where: { id: (req.params.id) }
            });
            models.Post.update({
                title: req.body.title,
                texte: req.body.texte,
            }, { where: { id: (req.params.id) } });

            return res.status(201).send({ message: "Post modifiée" })
        } catch (err) { res.status(500).json(err); }
    },

    // Delete Post 

    deletePost: (req, res) => {
        try {
            models.Post.destroy({
                where: {
                    id: (req.params.id)
                },
                include: [{
                    model: models.Coms,
                    attributes: ["id"],
                }, ],
            });
            return res.status(200).send({ message: "Post supprimée" })
        } catch (err) { res.status(500).json({ err }); }
    },

};