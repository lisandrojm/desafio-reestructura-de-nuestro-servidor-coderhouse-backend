/* ************************************************************************** */
/* /src/components/handlebars/index.js - Contiene las rutas y controladores de los
 de handlebarsController.js. */
/* ************************************************************************** */

const CustomRouter = require('../../routes/router'); // Assuming you have a CustomRouter defined similarly to the first code snippet
const handlebarsController = require('./handlebarsController/handlebarsController');
const passportCall = require('../../utils/passport/passportCall'); // Ajusta la ruta
const { authorization } = require('../../utils/auth/auth');
const { validateCartId } = require('../../utils/routes/routerParams');

class HandlebarsRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }

  setupRoutes() {
    // Middleware para manejar los parámetros cid y pid
    this.router.param('cid', validateCartId);

    /* ************************************************************************************ */
    /* VIEWS */
    /* ************************************************************************************ */

    /* //////////////////////////////////// */
    /* Login / Register / Recovery */
    this.get('/', handlebarsController.getLogin);
    this.get('/register', handlebarsController.getRegister);
    this.get('/recovery', handlebarsController.getRecovery);

    /* ************************************************************************************ */
    /* //////////////////////////////////// */
    /* Jwt Login */

    /* //////////////////////////////////// */
    /* User */
    this.get('/products', passportCall('jwt'), authorization(['user']), handlebarsController.getProducts);
    this.get('/carts/:cid', passportCall('jwt'), authorization(['user']), handlebarsController.getCartProductById);
    this.get('/user', passportCall('jwt'), authorization(['user']), handlebarsController.getUser);
    this.get('/current', passportCall('jwt'), authorization(['user', 'admin']), handlebarsController.getCurrent);

    /* //////////////////////////////////// */
    /* Admin */
    this.get('/admin', passportCall('jwt'), authorization(['admin']), handlebarsController.getAdmin);

    /* ************************************************************************************ */
    /* ************************************************************************************ */

    /* //////////////////////////////////// */
    /* Desafíos */
    this.get('/home', handlebarsController.getHome);
    this.get('/realtimeproducts', handlebarsController.getRealTimeProducts);
    this.get('/chat', handlebarsController.getChat);
  }
}

module.exports = new HandlebarsRoutes();
