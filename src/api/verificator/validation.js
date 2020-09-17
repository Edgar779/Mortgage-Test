import * as Joi from 'joi';

import APIError from '../../services/APIError.js';

import { getErrorResponse, getResponse } from '../mainModels.js';

export const verificationCode = async (req, res, next) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            phone: Joi.string().required()
        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, "login function in auth/validation")
        res.status(500).send(getErrorResponse());
    }
}

export const checkPhone = async (req, res, next) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            phone: Joi.string().required(),
            code: Joi.string().required(),
        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, "login function in auth/validation")
        res.status(500).send(getErrorResponse());
    }
}
export const checkEmail = async (req, res, next) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            code: Joi.string().required(),
        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, "login function in auth/validation")
        res.status(500).send(getErrorResponse());
    }
}
export const sendCode = async (req, res, next) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            phone: Joi.string().required()
        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, "login function in auth/validation")
        res.status(500).send(getErrorResponse());
    }
}
export const sendEmail = async (req, res, next) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            phone: Joi.string().required(),
            email: Joi.string().required().email(),
            code: Joi.string().required(),
        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, "login function in auth/validation")
        res.status(500).send(getErrorResponse());
    }
}


