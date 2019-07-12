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

module.exports = router;
