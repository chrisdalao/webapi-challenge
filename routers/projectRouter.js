const express = require('express');
const Project = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            err = { error: "The projects information could not be retrieved" };
            res.status(500).json(err);
        })
});

module.exports = router;
