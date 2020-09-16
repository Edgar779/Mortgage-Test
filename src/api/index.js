import pkg from 'express';
const { Router, Response } = pkg;

import AuthRoutes from './auth/index.js';

class Routes {

  router = Router();

  constructor() {
    this.routes();
  }

  routes = () => {


    this.router.use('/auth', AuthRoutes);

  }
}

export default new Routes().router;