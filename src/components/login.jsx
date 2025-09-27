import React from "react";
import "../personnaliseCss/login.css"; // ton CSS custom
import { useLogiqueLogin } from "./logiqueLogin";
function Login() {
  const {
    handleChangeMatricule,
    handleChangePassword,
    handleSubmit,
    matricule,
    password,
  } = useLogiqueLogin();
  return (
    <div className="login-page d-flex vh-100">
      {/* Côté gauche : formulaire */}
      <div className="login-left d-flex align-items-center justify-content-center w-50 p-5">
        <div className="login-card w-100 p-4">
          <h2 className="fw-bold text-primary mb-4 text-center">Bienvenue</h2>
          <p className="text-muted text-center mb-4">
            Connectez-vous à E-Stock
          </p>

          <form onSubmit={handleSubmit}>
            {/* Matricule */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg rounded-pill"
                placeholder="Matricule"
                value={matricule}
                onChange={handleChangeMatricule}
              />
            </div>

            {/* Mot de passe */}
            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg rounded-pill"
                placeholder="Mot de passe"
                value={password}
                onChange={handleChangePassword}
              />
            </div>

            {/* Bouton */}
            <div className="d-flex justify-content-center mb-3">
              <button
                type="submit"
                className="btn btn-primary btn-lg rounded-pill"
              >
                Connexion
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Côté droit : image */}
      <div className="login-right w-50 d-flex align-items-center justify-content-center">
        <img
          src="/public/images/stok.jpg"
          alt="illustration"
          
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

export default Login;
