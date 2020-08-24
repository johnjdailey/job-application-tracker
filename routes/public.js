const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.resolve(__dirname, '../index.html'));
    })

router
    .route('/templates')
    .get((req, res) => {
        res.sendFile(path.resolve(__dirname, '../templates.html'));
    })

router
    .route('/login')
    .get((req, res) => {
        res.sendFile(path.resolve(__dirname, '../login.html'));
    })
    .post((req, res, next) => {
        if (req.body.username === process.env.USER && req.body.password === process.env.PASS) {
            jwt.sign(req.body.username, process.env.SECRET_KEY, (err, token) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json({ token });
                }
            });
        } else {
            res.sendStatus(401);
        }
    });

module.exports = router;

