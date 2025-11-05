// src/App.jsx
import TableGlobal from "../../globalComponents/TableGlobal";
import ModalPetit from "../../globalComponents/ModalPetit.jsx";
import  UseLogiqueModePaiement  from "./logiqueModePaiement.jsx";
import FromModePaiement from "./FromModePaiement.jsx";

function modePaiement() {
  const {
    stateModePaiement,
    actions,
    columns,

    // Modal et champs
    isModalOpen,
    isEditing,
    handleAjouter,
    handleCloseModal,
    libelle,
      handleChangeLibelle,
    
    handleSubmit,
    modalState, // 🔹 Ajout pour le modal suppression
    setModalState,
  } = UseLogiqueModePaiement();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Mode de paiement</h5>
        <button className="btn btn-success" onClick={() => handleAjouter()}>
          + Ajouter
        </button>
      </div>
      <TableGlobal
        data={stateModePaiement}
        columns={columns}
        actions={actions}
      />

      {/* Modal réutilisable */}
      <ModalPetit
        show={isModalOpen}
        onClose={handleCloseModal}
        title={isEditing ? "Modifier Mode Paiement" : "Ajouter Mode Paiement"}
      >
        <FromModePaiement
          libelle={libelle}
          onChangeLibelle={handleChangeLibelle}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
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
    </div>
  );
}

export default modePaiement;
