/* ************************************************************************** */
/* /src/routes/index.js - Contiene las definiciones de rutas para los productos y
carritos de compra.
/* ************************************************************************** */

const authApi = require('../components/auth');
const cartsApi = require('../components/carts');
const cookiesApi = require('../components/cookies');
const handlebarsApi = require('../components/handlebars');
const messagesApi = require('../components/messages');
const productsApi = require('../components/products');
const rolesApi = require('../components/roles');
const sessionsApi = require('../components/sessions');
const usersApi = require('../components/users');

module.exports = (app) => {
  app.use(authApi.router);
  app.use(cartsApi.router);
  app.use(cookiesApi.router);
  app.use(handlebarsApi.router);
  app.use(messagesApi.router);
  app.use(productsApi.router);
  app.use(rolesApi.router);
  app.use(sessionsApi.router);
  app.use(usersApi.router);
};
