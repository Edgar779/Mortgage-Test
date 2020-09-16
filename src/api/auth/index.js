import pkg from 'express';
const { Router, Response } = pkg;
import Services from './service.js';
import { getErrorResponse } from '../mainModels.js';
import APIError from '../../services/APIError.js';
import * as Validations from './validation';

class AuthRoutes {
   router = Router();

  constructor() {
    this.routes();
  }

   routes = () => {
    this.router.post('/signin', Validations.signin, this.signin);
    this.router.post('/checkPhone', Validations.checkPhone, this.checkPhone);
    this.router.post('/checkEmail', Validations.checkEmail, this.checkEmail);
    this.router.post('/sendCode', Validations.sendCode, this.sendCode);
    this.router.post('/sendEmail', Validations.sendEmail, this.sendEmail);
    this.router.post('/changePassword', Validations.changePassword,this.changePassword);




  }

   signin = async (req, res) => {
    try {
      const response = await Services.signin(req.body.name, req.body.phone, req.body.email, req.body.password);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'signin function in auth/service.js');
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
      const response = await Services.sendCode(req.body.phone);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'changePassword function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }
  sendEmail = async (req, res) => {
    try {
      const response = await Services.sendEmail(req.body.phone, req.body.code);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'changePasswordCheckCode function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }
  changePassword = async (req, res) => {
    try {
      const response = await Services.sendEmail(req.body.email, req.body.newPassword);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'changePassword function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

}

export default new AuthRoutes().router;