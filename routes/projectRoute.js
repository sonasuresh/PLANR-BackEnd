const router = require('express').Router();
const projectController = require('../controller/projectController');


router.delete('/:projectId', projectController.deleteProject);

router.post('/', projectController.createProject);//create project

router.put('/', projectController.updateProject);

router.get('/', projectController.getProjects);//gets project
module.exports = router;
