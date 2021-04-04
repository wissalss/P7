const Coms = require('../models/Coms');

/* CREATE ONE COM */
exports.createCom = (req, res, next) => {
    // console.log(req.body);
    let combody = req.body.com;
    const com = new Coms({
        ...combody
    });
    com.save()
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};