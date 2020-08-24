const Template = require('../models/Template');

exports.addTemplate = async (req, res, next) => {
    try {
        await Template.create(req.body);
        return res.status(200).json({
            success: true,
            message: `Template was created`
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try your request again later.'
        });
    }
};

exports.getTemplates = async (req, res, next) => {
    try {
        const templates = await Template.find({});
        return res.status(200).json(templates);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'A server error occurred when processing your request'
        });
    }
};

exports.updateTemplate = async (req, res, next) => {
    try {
        await Template.updateOne({ name: req.body.name }, req.body);
        return res.status(200).json({
            success: true,
            message: `Template was created`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'A server error occurred when processing your request'
        });
    }
};

exports.deleteTemplate = async (req, res, next) => {
    try {
        await Template.deleteOne({ name: req.body.name });
        return res.status(200).json({
            success: true,
            message: `Template was deleted`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'A server error occurred when processing your request'
        });
    }
};