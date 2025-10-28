// src/App.jsx
import TableGlobal from "../../globalComponents/TableGlobal";
import ModalPetit from "../../globalComponents/ModalPetit.jsx";
import ModalLG from "../../globalComponents/Modal_LG.jsx";
import ModalXL from "../../globalComponents/Modal_XL.jsx";
import { useLogiqueProduit } from "./logiqueProduit.jsx";
import FromProduit from "./FromProduit.jsx";
import FormLotProduit from "./FormLotProduit.jsx";
function Produit() {
  const {
    tailleProduit,
    stateProduit,
    actions,
    columns,
    codeLotProduit,
    stateFournisseur,
    // Modal et champs
    isModalOpen,
    isModalOpenLot,
    isModalOpenAjouterLot,
    isEditing,
    editingId,
    unitaire,
    handleAjouter,
    handleCloseModal,
    handleCloseModalLot,
    handleCloseModalAjouterLot,
    handleChangePrixUnitaire,
    handleChangeUnitaire,
    prixUnitaire,
    libelle,
    code,
    handleChangeNiveau,
    handleChangeLibelle,
    handleSubmit,
    modalState, // 🔹 Ajout pour le modal suppression
    setModalState,
    modalState2,
    modalState3,
    setModalState2,
    setModalState3,
    CodeLotProduit,

    totalQuantite,
    handleChangeQuantite,
    quantiteActuelle,
    quantiteLot1,
    handleChangePrixAchat,
    prixAchat,
    handleChangeDateExpiration,
    dateExpiration,
    fournisseur,
    handleChangeSelectFournisseur,
    EnregistrementProduitLot,
  } = useLogiqueProduit();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Liste des Produits ( {stateProduit.length} ) Produits</h5>
        <button className="btn btn-success" onClick={() => handleAjouter()}>
          + Ajouter Produit
        </button>
      </div>
      <TableGlobal data={stateProduit} columns={columns} actions={actions} />

      {/* Modal réutilisable */}
      <ModalPetit
        show={isModalOpen}
        onClose={handleCloseModal}
        title={isEditing ? "Modifier un Produits" : "Ajouter un Produits"}
      >
        <FromProduit
          nombreProduit={tailleProduit}
          libelle={libelle}
          prixUnitaire={prixUnitaire}
          onChangeprixUnitaire={handleChangePrixUnitaire}
          onChangeNiveau={handleChangeNiveau}
          onChangeLibelle={handleChangeLibelle}
          unitaire={unitaire}
          onChangeUnitaire={handleChangeUnitaire}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isEditing={isEditing}
        />
      </ModalPetit>
      <ModalPetit
        show={isModalOpenLot}
        onClose={handleCloseModalLot}
        title={isEditing ? "Modifier Lot de Produits" : "Ajouter un Produits"}
      >
        <FormLotProduit
          nombreProduit={tailleProduit}
          codeLotProduit={codeLotProduit}
          prixUnitaire={prixUnitaire}
          onChangeprixUnitaire={handleChangePrixUnitaire}
          onChangeNiveau={handleChangeNiveau}
          onChangeLibelle={handleChangeLibelle}
          unitaire={unitaire}
          onChangeUnitaire={handleChangeUnitaire}
          onSubmit={handleSubmit}
          onCancel={handleCloseModalLot}
          isEditing={isEditing}
        />
      </ModalPetit>
      <ModalPetit
        show={modalState.show}
        onClose={() => setModalState({ ...modalState, show: false })}
        title={modalState.title}
      >
        {modalState.content}
      </ModalPetit>

      <ModalXL
        show={modalState2.show}
        onClose={() => setModalState2({ ...modalState2, show: false })}
        title={modalState2.title}
      >
        {modalState2.content}
      </ModalXL>
      <ModalPetit
        show={modalState3.show}
        onClose={() => setModalState3({ ...modalState3, show: false })}
        title={modalState3.title}
      >
        {modalState3.content}
      </ModalPetit>

      <ModalXL
        show={isModalOpenAjouterLot}
        onClose={handleCloseModalAjouterLot}
        title={editingId ? "Ajouter Lot de Produits" : "Ajouter un Produits"}
      >
        <FormLotProduit
          nombreProduit={tailleProduit}
          codeLotProduit={CodeLotProduit}
          produitCode={code}
          produitLibelle={libelle}
          totalQuantite={totalQuantite}
          prixUnitaireProduit={prixUnitaire}
          prixAchat={prixAchat}
          onChangePrixAchat={handleChangePrixAchat}
          qteDisponible={quantiteActuelle}
          onChangeprixUnitaire={handleChangePrixUnitaire}
          onChangeNiveau={handleChangeNiveau}
          onChangeLibelle={handleChangeLibelle}
          onChangeQuantite={handleChangeQuantite}
          quantiteLotProduit={quantiteLot1}
          unitaire={unitaire}
          dateExpiration={dateExpiration}
          onChangeDateExpiration={handleChangeDateExpiration}
          onChangeUnitaire={handleChangeUnitaire}
          onSubmit={handleSubmit}
          onCancel={handleCloseModalAjouterLot}
          isEditing={editingId}
          dataFournisseur={stateFournisseur}
          valeurFournisseur={fournisseur}
          onChangeFournisseur={handleChangeSelectFournisseur}
          EnregistrementProduitLot={EnregistrementProduitLot}

        />
      </ModalXL>
    </div>
  );
}

export default Produit;
