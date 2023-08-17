/* ************************************************************************** */
/* /src/components/products/productsServices/productsServices.js -
 controlador de los productos. */
/* ************************************************************************** */

const { Product } = require('../../../models/products');

class ProductsServices {
  getAllProducts = async (limit, page, sort, query, res) => {
    try {
      const options = {
        limit: limit ? parseInt(limit) : 10,
        page: page ? parseInt(page) : 1,
        sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined,
      };
      const filter = query
        ? query === '0'
          ? {
              $or: [{ category: query }, { stock: 0 }],
            }
          : { category: query } // Búsqueda por categoría exacta
        : {};
      const result = await Product.paginate(filter, options);
      if (page && !/^\d+$/.test(page)) {
        return res.status(400).json({ status: 'error', error: 'El parámetro "page" debe ser un número válido' });
      }
      if (page && (parseInt(page) < 1 || parseInt(page) > result.totalPages)) {
        return res.status(400).json({ status: 'error', error: 'El número de página no existe' });
      }

      const data = {
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage || null,
        nextPage: result.nextPage || null,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/products?limit=${options.limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
        nextLink: result.hasNextPage ? `/products?limit=${options.limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null,
      };

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Error al obtener los productos' });
    }
  };

  addProduct = async (payload, images, res, req) => {
    try {
      const { title, description, code, price, stock, category } = payload;
      if (!title || !description || !code || !price || !stock || !category) {
        return res.status(500).json({ success: false, error: 'Faltan campos obligatorios' });
      }
      const existingProduct = await Product.findOne({ code: code });
      if (existingProduct) {
        return res.status(400).json({ success: false, error: 'Ya existe un producto con el mismo código' });
      }
      const newProduct = new Product({
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails: images && images.length > 0 ? images.map((image) => image.filename) : [],
      });
      await newProduct.save();
      req.app.io.emit('newProduct', newProduct);
      const data = newProduct;

      return res.status(201).json({ success: true, message: 'Producto agregado correctamente', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al agregar el producto' });
    }
  };

  getProductById = async (pid, res) => {
    try {
      const product = await Product.findById(pid);

      if (!product) {
        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
      }

      const data = product;
      return res.status(200).json({ success: true, payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al obtener el producto' });
    }
  };

  updateProduct = async (pid, updateFields, res, req) => {
    try {
      const allowedFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
      const invalidFields = Object.keys(updateFields).filter((field) => !allowedFields.includes(field));
      if (invalidFields.length > 0) {
        return res.status(400).json({ success: false, error: `Los siguientes campos no se pueden modificar: ${invalidFields.join(', ')}` });
      }

      const updatedProduct = await Product.findByIdAndUpdate(pid, updateFields, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
      }

      req.app.io.emit('updateProduct', updatedProduct);

      const data = updatedProduct;
      return res.status(200).json({ success: true, message: 'Producto actualizado correctamente', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al actualizar el producto' });
    }
  };

  deleteProduct = async (pid, res, req) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(pid);

      if (!deletedProduct) {
        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
      }

      req.app.io.emit('deleteProduct', pid);

      const data = deletedProduct;
      return res.status(200).json({ success: true, message: 'Producto eliminado correctamente', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al eliminar el producto' });
    }
  };

  getProducts = async (limit, page, sort, query, res) => {
    try {
      const options = {
        limit: limit ? parseInt(limit) : 10,
        page: page ? parseInt(page) : 1,
      };

      const filter = query
        ? query === '0'
          ? {
              $or: [{ category: query }, { stock: 0 }],
            }
          : { category: query } // Búsqueda por categoría exacta
        : {};

      const result = await Product.paginate(filter, options);

      const formattedProducts = result.docs.map((product) => {
        return {
          _id: product._id,
          title: product.title,
          description: product.description,
          code: product.code,
          price: product.price,
          stock: product.stock,
          category: product.category,
        };
      });

      const totalPages = result.totalPages;
      const currentPage = result.page;
      const hasPrevPage = result.hasPrevPage;
      const hasNextPage = result.hasNextPage;
      const prevPage = result.hasPrevPage ? result.prevPage : null;
      const nextPage = result.hasNextPage ? result.nextPage : null;
      const prevLink = result.hasPrevPage ? `/products?limit=${options.limit}&page=${result.prevPage}` : null;
      const nextLink = result.hasNextPage ? `/products?limit=${options.limit}&page=${result.nextPage}` : null;

      return {
        success: true,
        title: 'Products',
        products: formattedProducts,
        style: 'index.css',
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        totalPages,
        currentPage,
        prevLink,
        nextLink,
      };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error handlebars' });
    }
  };
}

module.exports = new ProductsServices();
