const { executeQuery } = require('../db/execute-sql-query')

async function createIssue(i_title, i_desc, p_id, created_at, priority) {
	try {
		if (typeof i_title == 'undefined' && typeof p_id == 'undefined') {
			throw new Error('Incomplete details to create a new Issue')
		}
		const query =
			'INSERT INTO issues(i_title,i_desc,p_id,created_at,priority)VALUES(?,?,?,?,?);'
		const params = [i_title, i_desc, p_id, created_at, priority]
		const createIssueResults = await executeQuery(query, params)
		return createIssueResults
	} catch (error) {
		throw error
	}
}

async function deleteIssue(issueId) {
	try {
		if (typeof issueId == 'undefined') {
			throw new Error('Issue Id is Null!')
		}
		const query = 'DELETE FROM issues where i_id=?;'
		const params = [issueId]
		const deleteIssueResults = await executeQuery(query, params)
		return deleteIssueResults
	} catch (error) {
		logger.error(error.message)
		throw error
	}
}

async function getIssues(projectId) {
	try {
		if (typeof projectId == 'undefined') {
			throw new Error('Project Id is Null! Cannot fetch Issues')
		}
		const query =
			'SELECT i_id,i_title,i_desc,created_at, priority, status FROM issues WHERE p_id=? ORDER BY i_id ASC;'
		const params = [projectId]
		const getIssuesResults = await executeQuery(query, params)
		return getIssuesResults
	} catch (error) {
		throw error
	}
}

async function updateIssue(i_id, i_title, i_desc, priority, status) {
	try {
		if (typeof i_id == 'undefined') {
			throw new Error('Issue Id is Null!Cannot update issues')
		}
		let where = []
		let queryParams = []
		if (typeof i_desc !== 'undefined') {
			where.push('i_desc = ?')
			queryParams.push(i_desc)
		}
		if (typeof i_title !== 'undefined') {
			where.push('i_title = ?')
			queryParams.push(i_title)
		}
		if (typeof priority !== 'undefined') {
			where.push('priority = ?')
			queryParams.push(priority)
		}
		if (typeof status !== 'undefined') {
			where.push('status = ?')
			queryParams.push(status)
		}
		queryParams.push(i_id)
		let query = 'UPDATE issues SET '
		query += where.join(',')
		query += ' WHERE i_id = ?;'
		const updateIssueResults = await executeQuery(query, queryParams)
		return updateIssueResults
	} catch (error) {
		throw error
	}
}

module.exports = {
	createIssue,
	deleteIssue,
	getIssues,
	updateIssue
}
