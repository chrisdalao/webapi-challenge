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

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;

    Project.getProjectActions(id)
        .then(actions => {
            if (actions && actions.length) {
                res.status(200).json(actions);
            } else {
                res.status(400).json({ message: 'That project does not exist' });
            }
        })
        .catch(err => {
            err = { error: "The actions for the that project could not be retrieved" };
            res.status(500).json(err);
        })
});


router.post('/', (req, res) => {
    const projectData = req.body;
    if (!projectData) {
        res.status(400).json({ message: "missing project data" });
    } else if (!projectData.name || !projectData.description) {
        res.status(400).json({ message: "please provide the required fields for name and description" });
    } else {
        Project.insert(projectData)
            .then(project => {
                if (project) {
                    res.status(201).json(projectData)
                }
            })
            .catch(err => {
                err = { error: "There was an error while saving the project to the database" };
                res.status(500).json(err);
            })
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if (!id) {
        res.status(404).json({ message: "The project with the specified ID does not exist" });
    } else if (!changes.name || !changes.description) {
        res.status(400).json({ errorMessage: "Please provide a name and description for the project" });
    } else {
        Project.update(id, changes)
            .then(updated => {
                if (updated) {
                    res.status(200).json(changes);
                }
            })

            .catch(err => {
                err = { error: "The project information could not be modified" };
                res.status(500).json(err);
            })
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Project.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(201).json(deleted);
            }
        })
        .catch(err => {
            err = { error: "The project could not be removed" };
            res.status(500).json(err);
        })
});


module.exports = router;
