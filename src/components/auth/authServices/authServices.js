/* ************************************************************************** */
/* /src/components/auth/authServices/authServices.js -  servicios de los usuarios. */
/* ************************************************************************** */
const { User } = require('../../../models/users');
const JWTService = require('../../../utils/jwt/jwt');
const { createHash, isValidPassword } = require('../../../utils/bcrypt/bcrypt');
const { Cart } = require('../../../models/carts');
const { config } = require('../../../config');
class AuthServices {
  /* ///////////////////////////////////// */
  /* Jwt */
  /* ///////////////////////////////////// */
  register = async (payload, res) => {
    try {
      const { first_name, last_name, email, age, password } = payload;

      if (!first_name || !last_name || !email || !age || !password) {
        return res.status(500).json({ success: false, error: 'Faltan campos obligatorios' });
      }

      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res.status(400).json({ success: false, error: 'Ya existe un usuario con el mismo correo electrónico' });
      }

      const newUser = new User({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
      });

      await newUser.save();

      const userCart = new Cart({
        user: newUser._id,
        products: [],
      });
      await userCart.save();

      newUser.cart = userCart._id;
      await newUser.save();

      const data = newUser;
      const token = await JWTService.generateJwt({ id: newUser._id });
      let updatedUser = await User.findByIdAndUpdate(newUser._id, { token }, { new: true });
      console.log('~~~User registrado~~~', updatedUser);
      return res.status(201).json({ success: true, message: 'Usuario agregado correctamente', ...newUser.toObject(), token, payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al agregar el usuario' });
    }
  };

  login = async ({ email, password, isAdminLogin }) => {
    try {
      if (isAdminLogin) {
        const adminUser = {
          email: config.admin_email,
          admin: true,
          role: 'admin',
        };
        return { status: 200, response: adminUser, isAdminLogin: false };
      } else {
        let user = await User.findOne({
          email: email,
        });

        if (!user) {
          console.log('~~~El usuario no existe en la base de datos!~~~');
          return { status: 401, response: 'El usuario no existe en la base de datos!' };
        }

        if (!isValidPassword(password, user)) {
          console.log('~~~Credenciales inválidas~~~');
          return { status: 403, response: 'Credenciales inválidas' };
        }

        console.log('~~~Login jwt success!~~~', user);
        return { status: 200, response: user, isAdminLogin: false };
      }
    } catch (error) {
      console.log(error);
      return { status: 500, response: 'Error en el servidor' };
    }
  };

  /* //////////////////////////////////// */
  /* Jwt & Session Logout */
  /* //////////////////////////////////// */
  logout = async (req, res) => {
    try {
      res.clearCookie('jwt'); // Borra la cookie 'jwt'
      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            const response = { success: false, error: err };
            req.logoutResult = response;
            reject(response);
          } else {
            const response = { success: true, message: 'Logout exitoso' };
            req.logoutResult = response;
            resolve(response);
          }
          console.log('Logout Session success');
        });
      });

      return req.logoutResult;
    } catch (err) {
      const response = { success: false, error: 'Error durante el logout' };
      req.logoutResult = response;
      return response;
    }
  };
}

module.exports = new AuthServices();
