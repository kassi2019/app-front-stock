import React from "react";

export default function Modal({ show, title, children, onClose, onSave }) {
  if (!show) return null; // Ne rien afficher si show=false

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Fermer
            </button>
            {onSave && (
              <button className="btn btn-primary" onClick={onSave}>
                Enregistrer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
