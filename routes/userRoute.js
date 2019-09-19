const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/login', userController.login);
router.post('/', userController.createUser);//create user

router.get('/', userController.getUsers);//gets user

module.exports = router;
