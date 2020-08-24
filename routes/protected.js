const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { addCompany, getCompanies, updateCompany, deleteCompanies } = require('../controllers/company');
const { getTemplates, addTemplate, deleteTemplate, updateTemplate } = require('../controllers/template');

router.use(verifyToken);

router
    .route('/')
    .get(getCompanies)
    .post(updateCompany)
    .delete(deleteCompanies);

router
    .route('/add')
    .post(addCompany);

router
    .route('/login')

router
    .route('/templates')
    .get(getTemplates)
    .post(addTemplate)
    .delete(deleteTemplate);

router
    .route('/update')
    .post(updateTemplate);

module.exports = router;

function verifyToken(req, res, next) {
    const token = req.headers['token'];

    if (token !== null) {
        req.token = token;
    } else {
        console.log('token', token);
        res.sendStatus(401);
    }

    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.sendStatus(401)
        } else {
            next();
        }
    })
}



