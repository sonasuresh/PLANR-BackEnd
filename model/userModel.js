const { executeQuery } = require('../db/execute-sql-query');
const bcrypt = require('bcryptjs')


async function createUser(userId, password) {
    try {
        if (typeof (userId) == 'undefined' && password == 'undefined') {
            throw new Error('Incomplete details to create a new user!');
        }
        const query = 'INSERT INTO users(userId,password)VALUES(?,?);';
        const params = [userId, password];
        const createUserResults = await executeQuery(query, params);
        return createUserResults;

    }
    catch (error) {
        throw error;
    }
}

async function getUsers() {
    try {
        const query = 'SELECT userId,password FROM users;';
        const getUsersResults = await executeQuery(query);
        return getUsersResults;
    } catch (error) {
        throw error;
    }
}

async function login(userId, password) {
    try {
        const query = 'SELECT password FROM users where userId=?;';
        const params = [userId];
        const oPassword = await executeQuery(query, params);
        console.log(oPassword)
        const match = await bcrypt.compare(password, oPassword[0].password);
        return match;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createUser,
    getUsers,
    login
}