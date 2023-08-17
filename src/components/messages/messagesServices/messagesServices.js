/* ************************************************************************** */
/* /src/components/messages/messagesServices/messagesServices.js -
 controlador de los servicios. */
/* ************************************************************************** */

/* Importar el modelo de mensaje */
const { Message } = require('../../../models/messages');

/* Definir la clase 'MessagesServices' */
class MessagesServices {
  addUserMessage = async (payload, res) => {
    try {
      /* Obtener los datos del mensaje de los campos de payload */
      const { user, message } = payload;

      /* Crear el objeto del nuevo mensaje */
      const newMessage = new Message({
        user,
        message,
      });

      /* Guardar el nuevo mensaje en la base de datos */
      await newMessage.save();
      /* Emitir un evento de 'newMessage' a través de socket.io */
      /* req.app.io.emit('newMessage', newMessage); */
      /* Devolver una respuesta exitosa con un mensaje de éxito */
      const data = newMessage;
      return res.status(200).json({ success: true, message: 'Mensaje agregado correctamente', payload: data });
    } catch (error) {
      /* Devolver una respuesta de error en caso de producirse un error al agregar el mensaje */
      throw new Error('Error al agregar el mensaje');
    }
  };

  getAllMessages = async (res) => {
    try {
      /* Obtener todos los mensajes de la base de datos */
      const messages = await Message.find();
      const data = messages;
      /* Enviar una respuesta exitosa con los mensajes obtenidos */
      return res.status(200).json({ success: true, payload: data });
    } catch (error) {
      /* Enviar una respuesta de error en caso de producirse un error al obtener los mensajes */
      return res.status(500).json({ success: false, error: 'Error al obtener los mensajes' });
    }
  };

  deleteUserMessage = async (mid, res, req) => {
    try {
      /* Buscar el producto por su ID y eliminarlo */
      const deletedMessage = await Message.findByIdAndDelete(mid);

      if (!deletedMessage) {
        /* Enviar una respuesta de error si el producto no se encuentra */
        return res.status(404).json({ success: false, error: 'Mensaje no encontrado' });
      }

      /* Emitir un evento de 'deleteMessage' a través de socket.io */
      /* req.app.io.emit('deleteMessage', pid); */
      const data = deletedMessage;
      /* Enviar una respuesta exitosa con un mensaje de éxito */
      return res.status(200).json({ success: true, message: 'Mensaje eliminado correctamente', payload: data });
    } catch (error) {
      /* Enviar una respuesta de error en caso de producirse un error al eliminar el mensaje */
      return res.status(500).json({ success: false, error: 'Error al eliminar el mensaje' });
    }
  };
}

/* Exportar una instancia de la clase 'MessagesServices' */
module.exports = new MessagesServices();
