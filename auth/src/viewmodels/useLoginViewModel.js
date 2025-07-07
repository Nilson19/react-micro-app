import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "shell/store";
import { login as doLogin } from "../controllers/AuthController";

export function useLoginViewModel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await doLogin(email, password);
      console.log("Usuario logueado:", response.data);
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
