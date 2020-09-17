import pkg from 'express';
const { Router, Response } = pkg;
import Services from './service.js';
import { getErrorResponse } from '../mainModels.js';
import APIError from '../../services/APIError.js';
import * as Validations from './validation';
import * as Verificators from '../verificator';

class AuthRoutes {
   router = Router();

  constructor() {
    this.routes();
  }

   routes = () => {

    this.router.post('/signin', Validations.signin, this.signin);

    this.router.post('/changePassword', Validations.changePassword,this.changePassword);

  }

   signin = async (req, res) => {
    try {
      const response = await Services.signin(req.body.name, req.body.phone, req.body.email, req.body.password, req.body.codeEmail, req.body.codePhone);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'signin function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

  changePassword = async (req, res) => {
    try {
      const response = await Services.changePassword(req.body.email, req.body.codePhone, req.body.codeEmail, req.body.newPassword);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'changePassword function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }


}

export default new AuthRoutes().router;