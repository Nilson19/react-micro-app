import { useState, useEffect } from "react";
import ShipmentController from "../controllers/ShipmentController";

export const useShipmentsViewModel = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShipments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ShipmentController.getShipments();
      setShipments(response.data);
    } catch (err) {
      setError("Error al cargar los envíos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return {
    shipments,
    loading,
    error,
    reload: fetchShipments,
  };
};
