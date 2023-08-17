/* ************************************************************************** */
/* /src/components/handlebars/handlebarscController/handlebarsController.js -
Controlador de handlebars */
/* ************************************************************************** */

const HandlebarsServices = require('../handlebarsServices/handlebarsServices');

class HandlebarsController {
  getLogin = async (req, res) => {
    const data = await HandlebarsServices.getLogin(res);
    return res.render('login', data);
  };

  getRegister = async (req, res) => {
    const data = await HandlebarsServices.getRegister(res);
    return res.render('register', data);
  };

  getRecovery = async (req, res) => {
    const data = await HandlebarsServices.getRecovery(res);
    return res.render('recovery', data);
  };

  /*   getUser = async (req, res) => {
    const userData = HandlebarsServices.getUser(req);
    const context = { user: req.session.user || req.user, ...userData };
    res.render('profile', context);
  }; */
  getUser = async (req, res) => {
    const data = await HandlebarsServices.getUser(res);
    const context = { user: req.session.user || req.user, ...data };
    return res.render('profile', context);
  };

  getAdmin = async (req, res) => {
    const data = await HandlebarsServices.getAdmin(res);
    const context = { user: req.session.user || req.user, ...data };
    return res.render('dashboard', context);
  };

  getCurrent = async (req, res) => {
    const data = await HandlebarsServices.getCurrent(res);
    const context = { user: req.session.user || req.user, ...data };
    return res.render('current', context);
  };

  /*   getCurrent = async (req, res) => {
    const userData = HandlebarsServices.getCurrent(req);
    const context = { user: req.session.user || req.user, ...userData };
    res.render('current', context);
  }; */

  getProducts = async (req, res) => {
    const { limit, page, sort, query } = req.query;
    const userData = req.session.user || req.user;
    const data = await HandlebarsServices.getProducts(limit, page, sort, query, res, userData);
    return res.render('products', data);
  };

  getCartProductById = async (req, res) => {
    const { cid } = req.params;
    const cartId = cid;
    const userData = req.session.user || req.user;
    const data = await HandlebarsServices.getCartProductById(cartId, res, userData);
    return res.render('carts', data);
  };

  getHome = async (req, res) => {
    const data = await HandlebarsServices.getHome(res);
    return res.render('home', data);
  };

  getRealTimeProducts = async (req, res) => {
    const data = await HandlebarsServices.getRealTimeProducts(res);
    return res.render('realTimeProducts', data);
  };

  getChat = async (req, res) => {
    const data = await HandlebarsServices.getChat(res);
    return res.render('chat', data);
  };
}
module.exports = new HandlebarsController();
