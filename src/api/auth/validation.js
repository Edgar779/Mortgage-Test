import * as Joi from 'joi';

import APIError from '../../services/APIError.js';

import { getErrorResponse, getResponse } from '../mainModels.js';

import Users from "../../models/Users/index";


export const signin = async (req, res, next) => {
    try {
        const phone = req.body.phone;

        const findUser = await Users.findOne({ phone });
        console.log(findUser)

        if(findUser && findUser.phone == phone){
            console.log(findUser)
          return res.send(getResponse(false, "User existed Please type another number"))
    
        }
    
        const data = req.body;
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().required().email(),

            password: Joi.string().required().min(6).max(40),
            
            codeEmail: Joi.string().required(),
            codePhone: Joi.string().required()

        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, 'sign-in function in auth/validation.js');
        res.status(500).send(getErrorResponse());
    }

};

export const changePassword = async (req, res, next) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            newPassword: Joi.string().required(),
            codePhone: Joi.string().required(),
            codeEmail: Joi.string().required()
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

