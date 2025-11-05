import React from "react";

function FromModePaiement({
  // niveau,
  libelle,
  onChangeLibelle,
  onSubmit,
  onCancel,
  isEditing,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-row mb-2">
        <div className="mb-3 col-md-12 col-lg-12 col-sm-12">
          <label className="form-label">
            Libelle<span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Libelle..."
            value={libelle}
            onChange={onChangeLibelle}
          />
        </div>
        {/* <div className="mb-3 col-md-12 col-lg-12 col-sm-12">
          <BarcodeScanner codebarre={libelle} />
        </div> */}
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-danger me-2"
          onClick={onCancel}
        >
          Annuler
        </button>
        <button type="submit" className="btn btn-success">
          {isEditing ? "Mettre à jour" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}

export default FromModePaiement;
