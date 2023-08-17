/* ************************************************************************** */
/* /src/components/products/productsController/productsController.js -  servicios de los productos. */
/* ************************************************************************** */

/* Importar el servicio de productos */
const ProductsServices = require('../productsServices/productsServices');

/* Definir la clase 'ProductsController' */
class ProductsController {
  /* Obtener todos los productos */
  getAllProducts = async (req, res) => {
    /* Obtener el límite de productos de los parámetros de consulta */
    const { limit, page, sort, query } = req.query;
    /* Llamar al método getAllProducts de ProductsServices */
    return await ProductsServices.getAllProducts(limit, page, sort, query, res);
  };

  /* Agregar un nuevo producto */
  addProduct = async (req, res) => {
    /* Obtener los datos del producto de los campos de payload */
    const payload = req.body;
    /* Obtener las imágenes de los archivos adjuntos */
    const images = req.files;
    /* Llamar al método addProduct de ProductsServices */
    return await ProductsServices.addProduct(payload, images, res, req);
  };

  /* Obtener un producto por ID */
  getProductById = async (req, res) => {
    /* Obtener el ID del producto de los parámetros de la solicitud */
    const { pid } = req.params;
    /* Llamar al método getProductById de ProductsServices */
    return await ProductsServices.getProductById(pid, res);
  };

  /* Actualizar un producto */
  updateProduct = async (req, res) => {
    /* Obtener el ID del producto de los parámetros de la solicitud */
    const { pid } = req.params;
    /* Obtener los campos de actualización de la solicitud */
    const updateFields = req.body;
    /* Llamar al método updateProduct de ProductsServices */
    return await ProductsServices.updateProduct(pid, updateFields, res, req);
  };

  /* Eliminar un producto */
  deleteProduct = async (req, res) => {
    /* Obtener el ID del producto de los parámetros de la solicitud */
    const { pid } = req.params;
    /* Llamar al método deleteProduct de ProductsServices */
    return await ProductsServices.deleteProduct(pid, res, req);
  };
  getProducts = async (req, res) => {
    /* Obtener el límite de productos de los parámetros de consulta */
    const { limit, page, sort, query } = req.query;
    /* Llamar al método getAllProducts de ProductsServices */
    return await ProductsServices.getProducts(limit, page, sort, query, res);
  };
}

/* Exportar una instancia de la clase 'ProductsController' */
module.exports = new ProductsController();
