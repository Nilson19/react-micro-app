import axios from 'axios';

const ShipmentService = {
  quote: ({ originZip, destinationZip, weight, length, width, height }) =>
    axios
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
    axios
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

  getShipments: (id) => axios.get(`/shipments`).then(res => res.data),
};

export default ShipmentService;
