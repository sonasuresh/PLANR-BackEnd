const logger = require('../lib/logger')
const issueModel = require('../model/issueModel')

async function createIssue(req, res) {
	try {
		const { i_title, i_desc, p_id, priority, userId } = req.body
		const created_at = new Date()
		if (
			typeof i_title == 'undefined' &&
			typeof p_id == 'undefined' &&
			typeof priority == 'undefined'
		) {
			throw new Error('Incomplete details to create a new Issue')
		}
		const createIssueResults = await issueModel.createIssue(
			i_title,
			i_desc,
			p_id,
			created_at,
			priority,
			userId
		)
		res.status(200).send(createIssueResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}

async function updateIssue(req, res) {
	try {
		const { i_id, i_title, i_desc, priority, status } = req.body

		const updateIssueResults = await issueModel.updateIssue(
			i_id,
			i_title,
			i_desc,
			priority,
			status
		)
		res.status(200).send(updateIssueResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}
async function deleteIssue(req, res) {
	try {
		const { issueId } = req.params
		if (typeof issueId == 'undefined') {
			throw new Error('Issue Id is Null!')
		}
		const deleteIssueResults = await issueModel.deleteIssue(issueId)
		res.status(200).send(deleteIssueResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}
async function getIssues(req, res) {
	try {
		const { projectId } = req.params
		if (typeof projectId == 'undefined') {
			throw new Error('ProjectId is Null')
		}
		const getIssuesResults = await issueModel.getIssues(projectId)
		res.status(200).send(getIssuesResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}
module.exports = {
	createIssue,
	deleteIssue,
	getIssues,
	updateIssue
}
