import query from '../config/db.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import hashPassword from '../utils/hashPassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';


const userControllers = {
    getRegisterForm: (req, res) => {
        res.status(200).render('register-form');
    },
    getLoginForm: (req, res) => {
        res.status(200).render('login-form');
    },
    register: async (req, res) => {
        const { email, password, rePassword } = req.body;
        const sqlStr = 'SELECT * FROM users WHERE email = ?';
        const params = [email];

        // check if email exists
        const result = await query(sqlStr, params);
        if (result.length > 0) {
            return res.status(400).send('This email is already in use');
        }

        // validate email, password, check passwords match
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        const doMatchPasswords = matchPasswords(password, rePassword);

        if (isValidEmail && isValidPassword && doMatchPasswords) {
            const hashedPassword = hashPassword(password);

            // create a user
            const sqlStr = 'INSERT INTO users (email, password) VALUES (?, ?)';
            const params = [email, hashedPassword];
            const result = await query(sqlStr, params);

            if (result.affectedRows > 0) {
                res.status(302).redirect('/api/login');
            } else {
                res.status(400).render('404', {
                    title: 'Error 1',
                    message: 'Invalid email or password'
                });
            }
        } else {
            res.status(400).render('404', {
                title: 'Error 2',
                message: 'Invalid email or password'
            });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        const sqlStr = 'SELECT * FROM users WHERE email = ?';
        const params = [email];

        // check if email exists
        const result = await query(sqlStr, params);
        if (result.length === 0) {
            return res.status(400).render('404', {
                title: 'Error',
                message: 'Invalid email or password'
            });
        }

        // check if the password is correct
        bcrypt.compare(password, result[0].password, (err, isValid) => {
            if (err) {
                return console.error(err);
            }
            if (!isValid) {
                res.status(400).render('404', {
                    title: 'Error',
                    message: 'Invalid email or password'
                });
            }

            // create token
            const token = jwt.sign({ email }, process.env.TOKEN_SECRET);

             // set cookie
        if (token) {
            res.cookie('token', token, {
                httpOnly: true
            });
            res.status(302).redirect('/api/books');
        }
        });

       
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(302).redirect('/api/books');
    }
};

export default userControllers;
