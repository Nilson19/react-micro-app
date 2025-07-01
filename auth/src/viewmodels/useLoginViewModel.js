import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "shell/store";
import { login as doLogin } from "../controllers/AuthController";

export function useLoginViewModel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await doLogin(email, password);
      setUser(response.data);
      navigate("/dashboard");
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    navigate,
  };
}
