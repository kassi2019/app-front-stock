import React from "react";

function InfoCardTbResponsable({ title, value, gradient, handleOpenModal }) {
  return (
    <div className="col-md-2 col-sm-6 mb-3">
      <div
        className="card text-center shadow-sm border-0 h-100"
        style={{
          background: gradient,
          color: "white",
          borderRadius: "15px",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
          paddingTop: "2px",
          paddingBottom: "2px",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
        onClick={() => handleOpenModal && handleOpenModal(title, value)}
      >
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80px" }}>
          <h5 className="card-title fw-semibold mb-2" style={{ fontSize: "1rem" }}>{title}</h5>
          <p
            className="card-text fw-bold"
            style={{
              fontSize: "2rem", // Ajuste la taille ici
              marginBottom: 0,
              marginTop: "-1px", // Monte un peu la valeur
            }}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoCardTbResponsable;
