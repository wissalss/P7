const express = require('express');
const comsCtrl = require('../controllers/Coms');


// Router
exports.router = (() => {
    let comsRouter = express.Router();

    // Routes assignations
    comsRouter.post("/coms", comsCtrl.createCom);

    return comsRouter;
})();