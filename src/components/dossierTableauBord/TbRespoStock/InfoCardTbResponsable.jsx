import React from "react";

function InfoCardTbResponsable({ title, value, gradient, handleOpenModal }) {
  return (
     <div className="col-md-2">
        <div
           className="card text-center shadow-sm border-0"
          style={{
            background: gradient,
            color: "white",
            borderRadius: "15px",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={() => handleOpenModal && handleOpenModal(title, value)}
        >
          <div>
            <h5 className="card-title fw-semibold">{title}</h5>
            <p className="card-text display-6 fw-bold">{value}</p>
          </div>
      </div>
      
      
    </div>
    
  );
}

export default InfoCardTbResponsable;
