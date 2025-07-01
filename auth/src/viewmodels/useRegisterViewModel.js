import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "shell/store";
import { register as doRegister } from "../controllers/AuthController";

export function useRegisterViewModel() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    addresses: [""],
  });

  const [error, setError] = useState(null);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAddressChange = (idx, e) => {
    const newAddrs = [...form.addresses];
    newAddrs[idx] = e.target.value;
    setForm((f) => ({ ...f, addresses: newAddrs }));
  };

  const addAddress = () => {
    setForm((f) => ({ ...f, addresses: [...f.addresses, ""] }));
  };

  const removeAddress = (idx) => {
    setForm((f) => ({
      ...f,
      addresses: f.addresses.filter((_, i) => i !== idx),
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
      const user = await doRegister(form);
      setUser(user);
      navigate("/dashboard");
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
    handleSubmit,
    navigate,
  };
}
