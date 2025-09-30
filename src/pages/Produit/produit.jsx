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
    // Modal et champs
    isModalOpen,
    isModalOpenLot,
    isEditing,
    unitaire,
    handleAjouter,
    handleCloseModal,
    handleCloseModalLot,
    handleChangePrixUnitaire,
    handleChangeUnitaire,
    prixUnitaire,
    libelle,
    handleChangeNiveau,
    handleChangeLibelle,
    handleSubmit,
    modalState, // 🔹 Ajout pour le modal suppression
    setModalState,
    modalState2,
    modalState3,
    setModalState2,
    setModalState3,
  } = useLogiqueProduit();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Liste des Produits</h5>
        <button className="btn btn-success" onClick={() => handleAjouter()}>
          + Ajouter
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
    </div>
  );
}

export default Produit;
