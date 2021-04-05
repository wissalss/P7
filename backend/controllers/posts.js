// Imports
const models = require("../models");
const Posts = require("../models/post");
const asyncLib = require("async");
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Création Post 

exports.createPost = (req, res, next) => {
        let postbody = JSON.parse(req.body.post);
        const post = new models.Post({
            ...postbody,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        });
        post.save()
            .then(() => res.status(201).json({ message: 'Post enregistré !' }))
            .catch(error => res.status(400).json({ error }));

    },


    // Get All Posts 

    exports.listPosts = (req, res, next) => {
        models.Post.findAll({
                include: [{
                    model: models.Coms,
                    attributes: ["by", "text"],
                }, ],
            })
            .then((posts) => { res.status(200).json(posts); })
            .catch((error) => { res.status(400).json({ error }); });
    },


    // Update Post 

    exports.modifyPost = (req, res, next) => {
        var reqbody = null;
        var post = JSON.parse(req.body.post);

        if (req.file) {
            reqbody = {
                ...post,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
        } else { reqbody = {...post } };
        models.Post.findOne({
            where: {
                id: req.params.id
            }
        }).then(post => {
            if (req.file) {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    models.Post.update({
                            ...reqbody,
                            id: post.id
                        }, { where: { id: post.id } })
                        .then(() => res.status(201).json({ message: 'Post modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            } else {
                models.Post.update({
                        ...reqbody,
                        id: post.id
                    }, { where: { id: post.id } })
                    .then(() => res.status(201).json({ message: 'Post modifié !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
    };

// Delete Post 

exports.deletePost = (req, res, next) => {
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
}