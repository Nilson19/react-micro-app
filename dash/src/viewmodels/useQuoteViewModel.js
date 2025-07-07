import { useState } from "react";
import { useAuthContext } from "shell/store";
import ShipmentController from "../controllers/ShipmentController";

export function useQuoteViewModel() {
  const { user } = useAuthContext();
  console.log("Usuario en QuoteView:", user);

  const [form, setForm] = useState({
    originZip: "",
    destinationZip: "",
    weight: "",
    length: "",
    width: "",
    height: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleQuote = async (e) => {
    e.preventDefault();
    setError(null);
    setQuote(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const data = {
        originZip: form.originZip,
        destinationZip: form.destinationZip,
        weight: parseFloat(form.weight),
        length: parseInt(form.length, 10),
        width: parseInt(form.width, 10),
        height: parseInt(form.height, 10),
      };
      const q = await ShipmentController.quote(data);
      console.log("Cotización obtenida:", q);
      setQuote(q.data);
    } catch (err) {
      setError("Error al cotizar el envío");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setError(null);
    setSuccessMessage(null);
    setCreating(true);
    try {
      const data = {
        origin_zip: form.originZip,
        destination_zip: form.destinationZip,
        weight: parseFloat(form.weight),
        length: parseInt(form.length, 10),
        width: parseInt(form.width, 10),
        height: parseInt(form.height, 10),
        total_cost: quote,
      };
      const shipment = await ShipmentController.create(data);
      console.log("Envío creado:", shipment);

      setSuccessMessage("✅ Envío creado correctamente");

      // Ocultar mensaje después de 4s
      setTimeout(() => setSuccessMessage(null), 4000);

      // Limpiar formulario
      setForm({
        originZip: "",
        destinationZip: "",
        weight: "",
        length: "",
        width: "",
        height: "",
      });
      setQuote(null);
    } catch {
      setError("Error al crear el envío");
    } finally {
      setCreating(false);
    }
  };

  return {
    form,
    error,
    successMessage,
    quote,
    loading,
    creating,
    handleChange,
    handleQuote,
    handleCreate,
  };
}
