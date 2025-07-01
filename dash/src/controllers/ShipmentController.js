import ShipmentService from '../services/ShipmentService';

const ShipmentController = {
  /**
   * Cotizar envío
   * @param {Object} params - Parámetros del envío
   * @returns {Promise<Object>} - Resultado de la cotización
   */
  quote: async (params) => {
    try {
      const quoteResult = await ShipmentService.quote(params);
      return quoteResult;
    } catch (error) {
      console.error('Error al cotizar el envío:', error);
      throw error;
    }
  },

  /**
   * Crear envío
   * @param {Object} params - Parámetros del envío
   * @returns {Promise<Object>} - Resultado de la creación
   */
  create: async (params) => {
    try {
      const createResult = await ShipmentService.create(params);
      return createResult;
    } catch (error) {
      console.error('Error al crear el envío:', error);
      throw error;
    }
  },

  /**
   * Obtener envíos
   * @returns {Promise<Array>} - Lista de envíos
   */
  getShipments: async () => {
    try {
      const shipments = await ShipmentService.getShipments();
      return shipments;
    } catch (error) {
      console.error('Error al obtener los envíos:', error);
      throw error;
    }
  },
};

export default ShipmentController;
