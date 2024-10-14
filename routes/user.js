// import modules and dependencies
import express from 'express';
import userControllers from '../controllers/user.js';

const router = express.Router();

const { getLoginForm, login, getRegisterForm, register, logout } =
    userControllers;

// routes
router.get('/login', getLoginForm);
router.post('/login', login);

router.get('/register', getRegisterForm);
router.post('/register', register);

router.get('/logout', logout);

export default router;
