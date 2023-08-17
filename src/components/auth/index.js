/* ************************************************************************** */
/* /src/components/auth/index.js - Contiene las rutas y controladores de 
authController.js. */
/* ************************************************************************** */

const CustomRouter = require('../../routes/router');
const authController = require('./authController/authController');

class Auth extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }

  setupRoutes() {
    const basePath = '/api/session/auth'; // Almacena el prefijo de la ruta

    // Rutas para manejar la autenticación con el prefijo
    this.router.use(basePath, (req, res, next) => {
      // Tu middleware aquí, por ejemplo:
      console.log('~~~Middleware para rutas de autenticación~~~');
      next();
    });

    /* ////////////////////////////////////////// */
    /* Jwt */
    /* ////////////////////////////////////////// */
    this.post(`${basePath}/register`, authController.register);
    this.post(`${basePath}/login`, authController.login);

    /* //////////////////////////////////// */
    /* Github Session Login */
    /* //////////////////////////////////// */
    this.get(`${basePath}/github`, authController.githubLogin);
    this.get(`${basePath}/githubcallback`, authController.githubCallback, authController.githubCallbackRedirect);

    /* //////////////////////////////////// */
    /* Jwt & Session Logout */
    /* //////////////////////////////////// */
    this.get(`${basePath}/logout`, authController.logout);
  }
}

module.exports = new Auth();
