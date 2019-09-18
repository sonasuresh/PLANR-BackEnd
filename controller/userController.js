const logger = require('../lib/logger');
const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


async function createUser(req, res) {
    try {
        const { userId, password } = req.body;
        //const created_at = new Date();
        if (typeof (userId) == 'undefined' && typeof (password) == 'undefined') {
            throw new Error('Incomplete details to create a new User');
        }
        var hash = await bcrypt.hash(password, 10);
        const createUserResults = await userModel.createUser(
            userId,
            hash
        );
        res.status(200).send(createUserResults);
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error);
    }
}

async function getUsers(req, res) {
    try {
        const getUserResults = await userModel.getUsers()
        res.status(200).send(getUserResults)
    } catch (error) {
        logger.error(error.message)
        res.status(500).send(error)
    }
}

async function login(req, res) {
    try {
        const { userId, password } = req.body;
        const match = await userModel.login(userId, password);
        if (match) {
            var token = jwt.sign({ 'userId': userId }, 'secret');
            res.status(200).send(token);
        }
        else {
            res.status(403).send("failed");
        }

    } catch (error) {
        logger.error(error.message)
        res.status(500).send(error)
    }
}
module.exports = {
    createUser,
    getUsers,
    login
}