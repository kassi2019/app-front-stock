// src/components/FormStructure.jsx
//import BarcodeScanner from "./BarcodeScanner";
import GlobalSelect from "../../globalComponents/GlobalSelect";
function FormLotProduit({
  prixUnitaireProduit,
  dateExpiration,
  onChangeDateExpiration,
  onChangeNiveau,
  onChangeQuantite,
  codeLotProduit,
  produitCode,
  produitLibelle,
  quantiteLotProduit,
  onCancel,
  totalQuantite,
  qteDisponible,
  prixAchat,
  onChangePrixAchat,
  onChangeFournisseur,
  valeurFournisseur,
  dataFournisseur,
  EnregistrementProduitLot,
}) {
  return (
    <form>
      <div className="form-row mb-2">
        <div className="mb-3 col-md-6 col-lg-6 col-sm-6">
          <label className="form-label">
            Produit <span style={{ fontWeight: "bold", color: "red" }}></span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Code du lot..."
            value={produitCode + " - " + produitLibelle}
            onChange={onChangeNiveau}
            disabled
          />
        </div>
        <div className="mb-3 col-md-3 col-lg-3 col-sm-3">
          <label className="form-label">
            Prix Unitaire du Produit{" "}
            <span style={{ fontWeight: "bold", color: "red" }}></span>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Code du lot..."
            value={prixUnitaireProduit}
            onChange={onChangeNiveau}
            disabled
          />
        </div>
        <div className="mb-3 col-md-3 col-lg-3 col-sm-3">
          <label className="form-label">
            Code du lot
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
        <div className="mb-3 col-md-4 col-lg-4 col-sm-4">
          <label className="form-label">
            Nvelle Quantité (A){quantiteLotProduit}
            <span style={{ fontWeight: "bold", color: "red" }}></span>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Quantité..."
            value={quantiteLotProduit}
            onChange={onChangeQuantite}
          />
        </div>
        <div className="mb-3 col-md-4 col-lg-4 col-sm-4">
          <label className="form-label">
            Qté Disponible (B){" "}
            <span style={{ fontWeight: "bold", color: "red" }}></span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Quantité..."
            value={qteDisponible}
            disabled
          />
        </div>
        <div className="mb-3 col-md-4 col-lg-4 col-sm-4">
          <label className="form-label">
            Qté Total (C=A+B){" "}
            <span style={{ fontWeight: "bold", color: "red" }}></span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Quantité..."
            value={totalQuantite}
            onChange={onChangeNiveau}
            disabled
          />
        </div>
        <div className="mb-3 col-md-6 col-lg-6 col-sm-6">
          <label className="form-label">
            Prix d'achat
            <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Prix d'achat..."
            value={prixAchat}
            onChange={onChangePrixAchat}
          />
        </div>
        <div className="mb-3 col-md-6 col-lg-6 col-sm-6">
          <label className="form-label">
            Date d'expiration
            {/* <span style={{ fontWeight: "bold", color: "red" }}>(*)</span> */}
          </label>
          <input
            type="date"
            className="form-control"
            placeholder="Date d'expiration..."
            value={dateExpiration}
            onChange={onChangeDateExpiration}
          />
        </div>
        <div className=" col-lg-12 col-sm-12 col-md-12">
          <div className="form-group">
            <label htmlFor="exampleSelectGender">
              Catégorie fournisseur
              <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
            </label>
            <GlobalSelect
              options={dataFournisseur}
              value={valeurFournisseur}
              onChange={onChangeFournisseur}
            />
          </div>
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
        <button
          type="submit"
          className="btn btn-success"
          onClick={EnregistrementProduitLot}
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}

export default FormLotProduit;
