/* ************************************************************************** */
/* /src/routes/router.js - Punto de entrada principal para la ejecución de la aplicación */
/* ************************************************************************** */

const { Router } = require('express');

class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, ...callbacks) {
    this.router.get(path, ...this.applyCallbacks(callbacks));
  }

  post(path, ...callbacks) {
    this.router.post(path, ...this.applyCallbacks(callbacks));
  }

  put(path, ...callbacks) {
    this.router.put(path, ...this.applyCallbacks(callbacks));
  }

  delete(path, ...callbacks) {
    this.router.delete(path, ...this.applyCallbacks(callbacks));
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (req, res, next) => {
      try {
        await callback(req, res, next);
        console.log('~~~Callback~~~', callback);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    });
  }
}

module.exports = CustomRouter;
