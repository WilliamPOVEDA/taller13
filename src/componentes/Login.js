import React, { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://6458e6704eb3f674df80a174.mockapi.io/usuario", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (response.ok) {
        navigate("/productos");
      } else {
        console.log("No hubo conexion");
      }
    });
  };
  return (
    <div className="container">
      <h1 className="tituloLogin">LICORERIA LOS HERMANOS</h1>
      <div className="card">
        <h2 className="text">Inicio de sesion</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="button" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
