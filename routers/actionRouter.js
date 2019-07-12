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


router.post('/', (req, res) => {
    const actionData = req.body;
    if (!actionData) {
        res.status(400).json({ message: "missing action data" });
    } else if (!actionData.project_id || !actionData.description || !actionData.notes) {
        res.status(400).json({ message: "please provide the required fields for project_id, description and notes" });
    } else {
        Action.insert(actionData)
            .then(action => {
                if (action) {
                    res.status(201).json(actionData)
                }
            })
            .catch(err => {
                err = { error: "There was an error while saving the action to the database" };
                res.status(500).json(err);
            })
    }
});


module.exports = router;
