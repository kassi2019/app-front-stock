import React from "react";

function InfoCardTbCaissier({ title, value, gradient, handleOpenModal }) {
  return (
    <div className="col-md-4 col-sm-4 mb-3">
      <div
        className="card text-center shadow-sm border-0 h-100"
        style={{
          background: gradient,
          color: "white",
          borderRadius: "15px",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
        onClick={() => handleOpenModal && handleOpenModal(title, value)}
      >
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "90px" }}>
          <h5 className="card-title fw-semibold mb-2" style={{ fontSize: "1rem" }}>{title}</h5>
          <p
            className="card-text fw-bold"
            style={{
              fontSize: "2rem", // Ajuste la taille ici
              marginBottom: 0,
              marginTop: "10px", // Monte un peu la valeur
            }}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoCardTbCaissier;
