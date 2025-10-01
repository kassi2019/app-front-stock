// src/components/FormStructure.jsx

import GlobalSelect from "../../globalComponents/GlobalSelect";

//import BarcodeScanner from "./BarcodeScanner";
function FromFournisseur({
  // niveau,
  libelle,
  onChangeLibelle,
  onChangeTelephone,
  telephone,
  onSubmit,
  onCancel,
  isEditing,
  dataCategorieFournisseur = [],
  valeurCategorie,
  onChangeSelectCategorie,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-row mb-2">
        <div className=" col-lg-12 col-sm-12 col-md-12">
          <div className="form-group">
            <label htmlFor="exampleSelectGender">
              Catégorie fournisseur
              <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
            </label>
            <GlobalSelect
              options={dataCategorieFournisseur}
              value={valeurCategorie}
              onChange={onChangeSelectCategorie}
            />
          </div>
        </div>
        <div className="mb-3 col-md-12 col-lg-12 col-sm-12">
          <label className="form-label">
            Nom fournisseurs
            <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Libelle..."
            value={libelle}
            onChange={onChangeLibelle}
          />
        </div>

        <div className="mb-3 col-md-12 col-lg-12 col-sm-12">
          <label className="form-label">
            Téléphone
            <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="telephone..."
            value={telephone}
            onChange={onChangeTelephone}
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

export default FromFournisseur;
