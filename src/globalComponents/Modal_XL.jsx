import React from "react";
import ReactDOM from "react-dom";

const ModalXL = ({ show, onClose, title, children }) => {
  if (!show) return null; // Ne rien afficher si modal fermé

  return ReactDOM.createPortal(
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              style={{
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
                fontWeight: "bold",
                fontSize: "15px",
                lineHeight: "1",
              }}
            >
              X
            </button>
          </div>

          {/* Contenu dynamique */}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>,
    document.body // ✅ rend le modal directement dans <body>
  );
};

export default ModalXL;
