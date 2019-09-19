const router = require('express').Router()
const issueController = require('../controller/issueController')

router.delete('/:issueId', issueController.deleteIssue)
router.put('/', issueController.updateIssue)

router.get('/:projectId', issueController.getIssues) //get issues
router.post('/', issueController.createIssue) //create issue

module.exports = router
