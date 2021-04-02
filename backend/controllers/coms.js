const Coms = require('../models/Coms');

/* CREATE ONE COM */
exports.createCom = (req, res, next) => {
    let combody = req.body.com;
    const com = new Coms({
        ...combody
    });
    com.save()
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

const models = require("../models");

module.exports = {
    createCom: function (req, res) {
        const coms = {
            UserId: req.body.UserId,
            PostId: req.body.PostId,
            by: req.body.userName,
            text: req.body.text,
        };
        models.Coms.create(coms)
            .then((coms) => { res.status(201).json(coms); })
            .catch((err) => { res.status(500).json({ err }); });
    },
}