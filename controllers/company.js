const Company = require('../models/Company');

exports.addCompany = async (req, res, next) => {
    try {
        await Company.create(req.body);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
};

exports.getCompanies = async (req, res, next) => {
    try {
        const companies = await Company.find({}).sort({ company: 'asc' });
        res.status(200).json(companies);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'A server error occurred when processing your request'
        });
    }
};

exports.updateCompany = async (req, res, next) => {

    const newData = {
        company: req.body.company,
    };

    if (req.body.contact) {
        newData.contact = req.body.contact;
    }
    if (req.body.position) {
        newData.position = req.body.position;
    }
    if (req.body.email) {
        newData.email = req.body.email;
    }
    if (req.body.template) {
        newData.template = req.body.template;
    }
    if (req.body.phone) {
        newData.phone = req.body.phone;
    }
    if (req.body.wasContacted) {
        newData.wasContacted = req.body.wasContacted;
    }
    if (req.body.dateContacted) {
        newData.dateContacted = req.body.dateContacted;
    }
    if (req.body.didRespond) {
        newData.didRespond = req.body.didRespond;
    }
    if (req.body.resultedInWork) {
        newData.resultedInWork = req.body.resultedInWork;
    }

    try {
        await Company.updateOne({ company: req.body.company }, newData);
        res.status(200).json({
            success: true,
            message: 'Company updated'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'A server error occurred when processing your request'
        });
    }
};

exports.deleteCompanies = async (req, res, next) => {
    try {
        for (let i = 0; i < req.body.companies.length; i++) {
            await Company.deleteOne({ company: req.body.companies[i] });
        }

        res.status(200).json({
            success: true,
            message: 'Company deleted'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'A server error occurred when processing your request'
        });
    }
};

