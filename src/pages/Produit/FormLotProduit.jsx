// src/components/FormStructure.jsx
//import BarcodeScanner from "./BarcodeScanner";
function FormLotProduit({
  prixUnitaire,
  unitaire,
  onChangeNiveau,
  codeLotProduit,
  quantiteLotProduit,
  onChangeprixUnitaire,
  onChangeUnitaire,
  onSubmit,
  onCancel,
  isEditing,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-row mb-2">
        <div className="mb-3 col-md-12 col-lg-12 col-sm-12">
          <label className="form-label">
            Code du lot{" "}
            <span style={{ fontWeight: "bold", color: "red" }}></span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Code du lot..."
            value={codeLotProduit}
            onChange={onChangeNiveau}
            disabled
          />
        </div>
        <div className="mb-3 col-md-12 col-lg-12 col-sm-12">
          <label className="form-label">
            Quantité <span style={{ fontWeight: "bold", color: "red" }}></span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Quantité..."
            value={quantiteLotProduit}
            onChange={onChangeNiveau}
          />
        </div>
        <div className="mb-3 col-md-12 col-lg-12 col-sm-12">
          <label className="form-label">
            Prix d'achat
            <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Prix d'achat..."
            value={prixUnitaire}
            onChange={onChangeprixUnitaire}
          />
        </div>
        <div className="mb-3 col-md-12 col-lg-12 col-sm-12">
          <label className="form-label">
            Date d'expiration
            <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Date d'expiration..."
            value={unitaire}
            onChange={onChangeUnitaire}
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

export default FormLotProduit;
