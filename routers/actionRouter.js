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
                err = { error: "The specified project_id does not exist" };
                res.status(500).json(err);
            })
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if (!id) {
        res.status(404).json({ message: "The action with the specified ID does not exist" });
    } else if (!changes.project_id || !changes.description || !changes.notes) {
        res.status(400).json({ errorMessage: "please provide the required fields for project_id, description and notes" });
    } else {
        Action.update(id, changes)
            .then(updated => {
                if (updated) {
                    res.status(200).json(changes);
                } else {
                    res.status(404).json({ message: "The action with the specified ID does not exist" });
                }
            })

            .catch(err => {
                err = { error: "The action information could not be modified" };
                res.status(500).json(err);
            })
    }
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Action.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).json(deleted);
            } else {
                res.status(404).json({ message: "The action with the specified ID does not exist" });
            }
        })
        .catch(err => {
            err = { error: "The action could not be removed" };
            res.status(500).json(err);
        })

});

module.exports = router;
