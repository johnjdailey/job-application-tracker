const express = require('express');
const router = express.Router();
const { addCompany, getCompanies, updateCompany, deleteCompanies } = require('../controllers/company');
const { getTemplates, addTemplate, deleteTemplate, updateTemplate } = require('../controllers/template');

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

