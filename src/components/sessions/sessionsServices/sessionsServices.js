/* ************************************************************************** */
/* /src/components/sessions/sessionsServices/sessionsServices.js - servicio de sessions. */
/* ************************************************************************** */

class SessionsServices {
  getSession = async (req, res) => {
    try {
      if (req.session.counter) {
        req.session.counter++;
        return res.status(200).json({ success: true, message: `Se ha visitado el sitio ${req.session.counter} veces.` });
      } else {
        req.session.counter = 1;
        return res.status(200).json({ success: true, message: 'Bienvenido!' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error en getSession al obtener la session' });
    }
  };

  deleteSession = async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (!err) {
          return res.status(200).json({ success: true, message: 'Logout Ok!' });
        } else {
          return res.status(500).json({ success: false, error: 'Logout ERROR', body: err });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error en deleteSession al eliminar la session' });
    }
  };
}

module.exports = new SessionsServices();
