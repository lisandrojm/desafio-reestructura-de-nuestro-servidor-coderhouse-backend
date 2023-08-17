/* ************************************************************************** */
/* /src/components/products/index.js - Contiene las rutas y controladores de 
productsController.js. */
/* ************************************************************************** */

const CustomRouter = require('../../routes/router'); // Assuming you have a CustomRouter defined similarly to the first code snippet
const productsController = require('./productsController/productsController');
const upload = require('../../utils/multer/multer');
const { validateProductId } = require('../../utils/routes/routerParams');

class ProductsRoutes extends CustomRouter {
  constructor() {
    super(); // Set the base path for the routes
    this.setupRoutes();
  }

  setupRoutes() {
    // Middleware para manejar el parametro pid
    this.router.param('pid', validateProductId);

    const basePath = '/api/products'; // Almacena el prefijo de la ruta

    // Rutas para manejar los productos
    this.get(`${basePath}/`, productsController.getAllProducts);
    this.get(`${basePath}/:pid`, productsController.getProductById);
    this.put(`${basePath}/:pid`, productsController.updateProduct);
    this.delete(`${basePath}/:pid`, productsController.deleteProduct);
    this.post(`${basePath}/`, upload.array('image', 5), productsController.addProduct);
  }
}

module.exports = new ProductsRoutes();
