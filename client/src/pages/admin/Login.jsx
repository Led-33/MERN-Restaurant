import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/admin/dashboard");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Email ou mot de passe incorrect."
      );
    }
  };

  return (
    <div className="container py-5">

      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "420px" }}
      >

        <h2 className="text-center mb-4">
          🔐 Connexion Administrateur
        </h2>

        <form onSubmit={handleLogin}>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Mot de passe
            </label>

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-danger w-100"
          >
            Se connecter
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;