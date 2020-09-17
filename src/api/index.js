import pkg from 'express';
const { Router, Response } = pkg;

import AuthRoutes from './auth/index.js';
import Verificator from './verificator/index.js';


class Routes {

  router = Router();

  constructor() {
    this.routes();
  }

  routes = () => {


    this.router.use('/auth', AuthRoutes);
    this.router.use('/verify', Verificator);


  }
}

export default new Routes().router;