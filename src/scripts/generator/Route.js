const { body, validationResult, matchedData } = require('express-validator');
const errorHandler = require('./../providers/errorHandler');
const { {{ ModelName }}, Group } = require('./../models');
const middleware = require('./middleware');
const passport = require('passport');
const express = require('express');

const app = (module.exports = express.Router());


/**
 * GET /api/v1/{{ modelnames }}
 * 
 */
app.get('/{{ modelnames }}', [
    passport.authenticate('jwt', { session: false })
], async (req, res) => {
    try {
        const {{ modelnames }} = await {{ ModelName }}.findAll();

        return res.json({{ modelnames }});
    } catch (error) {
        errorHandler(error, res);
    }
});


/**
 * GET /api/v1/{{ modelnames }}/:{{ modelName }}ID
 * 
 */
app.get('/{{ modelnames }}/:{{ modelName }}ID', [
    passport.authenticate('jwt', { session: false }),
], async (req, res) => {
    try {
        return res.json(
            await {{ ModelName }}.findByPk(req.params.{{ modelName }}ID)
        );
    } catch (error) {
        return errorHandler(error, res);
    }
});


/**
 * POST /api/v1/{{ modelnames }}
 * 
 * Create {{ ModelName }}
 */
app.post('/{{ modelnames }}', [
    passport.authenticate('jwt', { session: false }),
    // body('field').exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
        const data = matchedData(req);

        const {{ modelName }} = await {{ ModelName }}.create(data);

        return res.json({{ modelName }});
    } catch (error) {
        return errorHandler(error, res);
    }
});


/**
 * POST /api/v1/{{ modelnames }}/:{{ modelName }}ID
 * 
 * Update {{ ModelName }}
 */
app.post('/{{ modelnames }}/:{{ modelName }}ID', [
    passport.authenticate('jwt', { session: false }),
    // body('field').exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
        const data = matchedData(req);

        await {{ ModelName }}.update(data, {
            where: {
                id: req.params.{{ modelName }}ID,
            }
        });

        return res.json(await {{ ModelName }}.findByPk(req.params.{{ modelName }}ID));
    } catch (error) {
        return errorHandler(error, res);
    }
});



/**
 * DELETE /api/v1/{{ modelnames }}/:{{ modelName }}ID
 * 
 * Delete {{ ModelName }}
 */
app.delete('/{{ modelnames }}/:{{ modelName }}ID', [
    passport.authenticate('jwt', { session: false }),
], async (req, res) => {
    try {
        await {{ ModelName }}.destroy({
            where: {
                id: req.params.{{ modelName }}ID,
            }
        });

        return res.json({ id: req.params.{{ modelName }}ID });
    } catch (error) {
        return errorHandler(error, res);
    }
});
