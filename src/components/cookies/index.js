/* ************************************************************************** */
/* /src/components/cookies/index.js - Contiene las rutas y controladores de  
cookiesController.js. */
/* ************************************************************************** */

const CustomRouter = require('../../routes/router'); // Assuming you have a CustomRouter defined similarly to the first code snippet
const cookiesController = require('./cookiesController/cookiesController');

class Cookies extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }

  setupRoutes() {
    const basePath = '/api/sessions'; // Almacena el prefijo de la ruta

    this.get(`${basePath}/setsignedcookies`, cookiesController.setSignedCookies);
    this.get(`${basePath}/getsignedcookies`, cookiesController.getSignedCookies);
    this.get(`${basePath}/deletesignedcookies`, cookiesController.deleteSignedCookies);
  }
}

module.exports = new Cookies();
