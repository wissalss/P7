const models = require("../models");

module.exports = {
    createCom: function(req, res) {
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