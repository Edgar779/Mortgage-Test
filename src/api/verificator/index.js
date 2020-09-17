import pkg from 'express';
const { Router, Response } = pkg;
import Services from './service.js';
import { getErrorResponse } from '../mainModels.js';
import APIError from '../../services/APIError.js';
import * as Validations from './validation';
import * as Verificators from '../verificator';


class Verificator {
   router = Router();

  constructor() {
    this.routes();
  }

   routes = () => {

    this.router.post('/verification-code', Validations.verificationCode, Verificators.sendPhone, Verificators.sendMail, this.verification);

    this.router.post('/checkPhone', Validations.checkPhone,  this.checkPhone);
    this.router.post('/checkEmail',  Validations.checkEmail, this.checkEmail);
    this.router.post('/sendCode', Validations.sendCode, Verificators.sendPhone, this.sendCode);
    this.router.post('/sendEmail', Validations.sendEmail, Verificators.sendMail, this.sendEmail);

  }
  verification = async (req, res) => {
    try {
      const response = await Services.verification(req.body.email, req.body.phone, req.body.codeEmail, req.body.codePhone);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'verification function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }
  checkPhone = async (req, res) => {
    try {
      const response = await Services.checkPhone(req.body.phone, req.body.code);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'checkPhone function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }
  checkEmail = async (req, res) => {
    try {
      const response = await Services.checkEmail(req.body.email, req.body.code);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'checkEmail function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }
  sendCode = async (req, res) => {
    try {
      const response = await Services.sendCode(req.body.phone, req.body.codePhone);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'changePassword function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }
  sendEmail = async (req, res) => {
    try {
      const response = await Services.sendEmail(req.body.phone, req.body.email, req.body.code, req.body.codeEmail);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'changePasswordCheckCode function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

}

export default new Verificator().router;