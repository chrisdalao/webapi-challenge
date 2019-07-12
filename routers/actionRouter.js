const express = require('express');
const Action = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            err = { error: "The actions information could not be retrieved" };
            res.status(500).json(err);
        })
});



module.exports = router;
