const projectModel = require('../model/projectModel')
const logger = require('../lib/logger')

async function createProject(req, res) {
	try {
		const { p_name, p_desc } = req.body
		const created_at = new Date()
		console.log(req.body)
		if (
			typeof p_name === 'undefined' ||
			typeof p_desc === 'undefined' ||
			created_at === 'undefined'
		) {
			throw new Error('Invalid Data')
		}
		const createProjectResults = await projectModel.createProject(
			p_name,
			p_desc,
			created_at
		)
		res.status(200).send(createProjectResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}

async function updateProject(req, res) {
	try {
		const { p_id, p_name, p_desc } = req.body
		const updateProjectResults = await projectModel.updateProject(
			p_id,
			p_name,
			p_desc
		)
		res.status(200).send(updateProjectResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}

async function deleteProject(req, res) {
	try {
		const { projectId } = req.params
		if (typeof projectId == 'undefined') {
			throw new Error('Project Id is undefined')
		}
		const deleteProjectResults = await projectModel.deleteProject(projectId)
		res.status(200).send(deleteProjectResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}

async function getProjects(req, res) {
	try {
		const getProjectResults = await projectModel.getProjects()
		res.status(200).send(getProjectResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}
module.exports = {
	createProject,
	deleteProject,
	getProjects,
	updateProject
}
