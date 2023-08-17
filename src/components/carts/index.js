/* ************************************************************************** */
/* /src/components/carts/index.js - Contiene las rutas y controladores de  
cartsController.js. */
/* ************************************************************************** */

const CustomRouter = require('../../routes/router');
const cartsController = require('./cartsController/cartsController');
const { validateCartId, validateProductId } = require('../../utils/routes/routerParams');

class Carts extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }

  setupRoutes() {
    // Middleware para manejar los parámetros cid y pid
    this.router.param('cid', validateCartId);
    this.router.param('pid', validateProductId);

    const basePath = '/api/carts'; // Almacena el prefijo de la ruta

    // Rutas para manejar los carritos
    this.get(`${basePath}/`, cartsController.getCarts);
    this.post(`${basePath}/`, cartsController.addCart);
    this.get(`${basePath}/:cid`, cartsController.getCartProductById);
    this.post(`${basePath}/:cid/product/:pid`, cartsController.addProductToCart);
    this.delete(`${basePath}/:cid`, cartsController.deleteCart);
    this.delete(`${basePath}/:cid/product/:pid`, cartsController.deleteProductFromCart);
    this.put(`${basePath}/:cid`, cartsController.updateCart);
    this.put(`${basePath}/:cid/product/:pid`, cartsController.updateProductQuantity);
    this.delete(`${basePath}/:cid/products`, cartsController.deleteAllProductsFromCart);
  }
}

module.exports = new Carts();
