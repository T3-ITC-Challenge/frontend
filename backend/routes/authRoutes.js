const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.getCurrentUser);

router.post('/admin/create', authController.createAdmin);
router.post('/admin/delete', authController.deleteAdmin);
router.post('/other/action', authController.otherAction);

module.exports = router;