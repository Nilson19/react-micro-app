import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "shell/store";
import { register as doRegister } from "../controllers/AuthController";

export function useRegisterViewModel() {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    addresses: [
      {
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        is_default: true,
      },
    ],
  });

  const [error, setError] = useState(null);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAddressChange = (idx, field, value) => {
    const newAddrs = [...form.addresses];
    newAddrs[idx] = {
      ...newAddrs[idx],
      [field]: value,
    };
    setForm((f) => ({ ...f, addresses: newAddrs }));
  };

  const addAddress = () => {
    setForm((f) => ({
      ...f,
      addresses: [
        ...f.addresses,
        {
          street: "",
          city: "",
          state: "",
          zip_code: "",
          country: "",
          is_default: false,
        },
      ],
    }));
  };

  const removeAddress = (idx) => {
    setForm((f) => ({
      ...f,
      addresses: f.addresses.filter((_, i) => i !== idx),
    }));
  };

  const setDefaultAddress = (idx) => {
    setForm((f) => ({
      ...f,
      addresses: f.addresses.map((addr, i) => ({
        ...addr,
        is_default: i === idx,
      })),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Crea una copia sin confirmPassword
      const { confirmPassword, ...dataToSend } = form;
      const user = await doRegister(dataToSend);
      setUser(user);
      navigate("/auth");
    } catch {
      setError("No se pudo registrar");
    }
  };

  return {
    form,
    error,
    handleChange,
    handleAddressChange,
    addAddress,
    removeAddress,
    setDefaultAddress,
    handleSubmit,
    navigate,
  };
}
