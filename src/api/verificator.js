
import APIError from '../services/APIError.js';

import { getErrorResponse, getResponse } from './mainModels.js';

import mainConfig from '../env';

const accountSid = "AC14f22c42e1101f84c50331cac00ef091";
const authToken = '1f8543155fcc64c8f5b73397ecaf632f';
const crNum = '+18596671471';

const nodemailer = require('nodemailer');

const client = require('twilio')(accountSid, authToken);

export const sendMail = async (req, res, next) => {
    try {
        let codeEmail = Math.floor(1000 + Math.random() * 9000);


        var transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: mainConfig.gmail,
                pass: mainConfig.password
            }
        });

        var mailOptions = {
            from: mainConfig.gmail,
            to: `${req.body.email}`,
            subject: 'Mortgage',
            text: `${codeEmail}`
        };

        const sendMail = await transporter.sendMail(mailOptions);
        req.body.codeEmail = codeEmail;
        return next()
    }
    catch (e) {
        new APIError(e, 500, "sendMail function in api/Verificator")
        res.status(500).send(getErrorResponse());
    }
}

export const sendPhone = async (req, res, next) => {
    try {

        let codePhone = Math.floor(1000 + Math.random() * 9000);

        const message = await client.messages
            .create({
                to: req.body.phone,
                from: mainConfig.companyPhone,
                body: codePhone,
            })

        req.body.codePhone = codePhone;

        return next()
    }
    catch (e) {
        new APIError(e, 500, "sendPhone function in api/Verificator")
        res.status(500).send(getErrorResponse());
    }
}