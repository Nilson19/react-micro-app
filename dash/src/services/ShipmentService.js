import api from './api';

const ShipmentService = {
  quote: ({ originZip, destinationZip, weight, length, width, height }) =>
    api
      .post('/shipments/quote', {
        originZip,
        destinationZip,
        weight,
        length,
        width,
        height,
      })
      .then(res => res.data),

  create: ({ origin_zip, destination_zip, weight, length, width, height, total_cost }) =>
    api
      .post('/shipments/create', {
        origin_zip,
        destination_zip,
        weight,
        length,
        width,
        height,
        total_cost,
      })
      .then(res => res.data),

  getShipments: (id) => api.get(`/shipments`).then(res => res.data),
};

export default ShipmentService;
