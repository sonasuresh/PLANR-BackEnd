const { executeQuery } = require('../db/execute-sql-query');

async function createProject(p_name, p_desc, created_at) {
    try {
        if (typeof (p_name) == 'undefined' && created_at == 'undefined') {
            throw new Error('Incomplete details to create a new project!');
        }
        const query = 'INSERT INTO project(p_name,p_desc,created_at)VALUES(?,?,?);';
        const params = [p_name, p_desc, created_at];
        const createProjectResults = await executeQuery(query, params);
        return createProjectResults;

    }
    catch (error) {
        throw error;
    }
}

async function updateProject(p_id, p_name, p_desc) {
    try {
        if (typeof (p_id) == 'undefined') {
            throw new Error('Project Id is Null!Cannot update Project details.!')
        }
        //conditional updates
        if (typeof (p_desc) == 'undefined' && typeof (p_name) == 'undefined') {
            throw new Error('Project description and Project name is Null!');
        }
        let where = [];
        let queryParams = [];
        if (typeof (p_desc) !== 'undefined') {
            where.push('p_desc = ?')
            queryParams.push(p_desc)
        }
        if (typeof (p_name) !== 'undefined') {
            where.push('p_name = ?')
            queryParams.push(p_name)
        }
        queryParams.push(p_id)
        let query = 'UPDATE project SET ';
        query += where.join(',')
        query += " WHERE p_id = ?"
        const updateProjectResults = await executeQuery(query, queryParams);
        return updateProjectResults;
    } catch (error) {
        throw error;
    }
}
async function deleteProject(projectId) {
    try {
        if (typeof (projectId) == 'undefined') {
            throw new Error('Project Id is Null!');
        }
        const query = 'DELETE FROM project where p_id=?;';
        const params = [projectId];
        const deleteProjectResults = await executeQuery(query, params);
        return deleteProjectResults;
    } catch (error) {
        throw error;
    }
}

async function getProjects() {
    try {
        const query = 'SELECT p_id,p_name,p_desc,created_at FROM project;';
        const getProjectsResults = await executeQuery(query);
        return getProjectsResults;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createProject,
    deleteProject,
    getProjects,
    updateProject
}