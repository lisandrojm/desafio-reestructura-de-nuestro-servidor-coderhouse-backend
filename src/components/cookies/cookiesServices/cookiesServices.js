/* ************************************************************************** */
/* /src/components/cookies/cookiesServices/cookiesServices.js - servicio de auth. */
/* ************************************************************************** */

class CookiesServices {
  setSignedCookies = async (req, res) => {
    try {
      await res.cookie('SignedCookie', 'Esta es una cookie muy poderosa', { maxAge: 10000, signed: true });
      return res.status(200).json({ success: true, message: 'SignedCookie firmada' });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error en setSignedCokies al configurar la cookie firmada' });
    }
  };

  getSignedCookies = async (req, res, next) => {
    try {
      const signedCookie = req.signedCookies.SignedCookie;

      if (signedCookie) {
        return res.status(200).json({ success: true, signedCookie });
      } else {
        return res.status(404).json({ success: false, error: 'No se encontró la cookie firmada' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error en getSignedCookies al obtener la cookie' });
    }
  };

  deleteSignedCookies = async (req, res) => {
    try {
      await res.clearCookie('SignedCookie');
      return res.status(200).json({ success: true, message: 'SignedCookie eliminada' });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error en deleteSignedCookies al eliminar la cookie firmada' });
    }
  };
}

module.exports = new CookiesServices();
