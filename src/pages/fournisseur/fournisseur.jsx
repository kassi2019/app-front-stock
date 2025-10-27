import React, { useEffect, useState } from "react";
import {
  messageErreur,
  messageSucces,
} from "../../globalComponents/Notification.js";
import {
  fournisseurParCategorie,
  ajouterFournisseur,
  supprimerFournisseur,
  modifierFournisseur,
} from "../../Service/fournisseur.js";
import { listeCategorieFournisseur } from "../../Service/categorieFournisseur.js";
import { useDispatch, useSelector } from "react-redux";
import FromFournisseur from "./FromFournisseur.jsx";
import ModalPetit from "../../globalComponents/ModalPetit.jsx";
// import { messageSucces } from "../../globalComponents/Notification.js";
function Fournisseur() {
  const [expandedRows, setExpandedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [libelle, setLibelle] = useState("");
  const [telephone, setTelephone] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [categorie_id, setSelectCategorie] = useState(null);

  //const [infoLotProduit, setinfoLotProduit] = useState(0);
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    content: null,
  });
  const handleCloseModal = () => {
    setIsModalOpen(false);

    setLibelle("");
    setTelephone("");

    //setEditingId(null);
  };
  const handleModifier = (row) => {
    console.log({ row });
    setEditingId(row.id);

    setLibelle(row.nom_fournisseur);
    setTelephone(row.telephone);
    setSelectCategorie(row.type_fournisseur_id);
    setIsEditing(true);
    setIsModalOpen(true);
  };
  const handleChangeLibelle = (e) => setLibelle(e.target.value);
  const handleChangeTelephone = (e) => setTelephone(e.target.value);
  //   const [stockTheorique, setStockTheorique] = useState({});
  const toggleRow = (idProduit) => {
    setExpandedRows((prev) => ({
      ...prev,
      [idProduit]: !prev[idProduit],
    }));
  };
  const { stateFournisseurParCategorie } = useSelector(
    (state) => state.fournisseurs
  );
  const { SelectCategorieFournisseur } = useSelector(
    (state) => state.categorieFournisseurs
  );
  console.log({ SelectCategorieFournisseur });
  //const [data] = useState(inventaireData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fournisseurParCategorie());
    dispatch(listeCategorieFournisseur());
  }, [dispatch]);
  const handleAjouter = () => {
    //setEditingId(null);

    setLibelle("");
    setTelephone("");
    setIsEditing(false);
    setIsModalOpen(true);
  };
  const handleChangeSelectCategorie = (e) => {
    const selectedId = e;
    setSelectCategorie(selectedId);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!libelle) {
      messageErreur("Veuillez remplir tous les champs");
      return;
    }

    const formData = {
      nom_fournisseur: libelle,
      telephone: telephone,
      type_fournisseur_id: categorie_id,
    };
    // console.log(formData);
    try {
      if (editingId) {
        await dispatch(
          modifierFournisseur({ id: editingId, data: formData })
        ).unwrap();
        messageSucces("Modification effectuée avec succès");
        handleCloseModal();
      } else {
        // Vérification si le Code existe déjà
        // const exists = stateCategorieFournisseur.some((s) => s.Code === code);
        // if (exists) {
        //   messageErreur("Ce Code existe déjà.");
        //   return;
        // }

        await dispatch(ajouterFournisseur(formData)).unwrap();
        messageSucces("Enregistrement effectué avec succès");

        setLibelle("");
      }
    } catch (error) {
      messageErreur("Une erreur est survenue !", error);
    }
  };

  const confirmerSuppression = async (id) => {
    console.log(id);
    try {
      await dispatch(supprimerFournisseur(id)).unwrap();
      messageSucces("Suppression effectuée avec succès");
      setModalState({ ...modalState, show: false }); // Fermer le modal
    } catch (error) {
      messageErreur("Erreur lors de la suppression", error);
    }
  };
  const handleSupprimer = (row) => {
    setModalState({
      show: true,
      title: "Confirmer la suppression",
      content: (
        <div>
          <p>
            Voulez-vous vraiment supprimer la categorie{" "}
            <strong> {row.nom_fournisseur}</strong> ?
          </p>
          <div className="d-flex justify-content-end">
            {/* <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={handleCloseModal}
            >
              Annuler
            </button> */}
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => confirmerSuppression(row.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      ),
    });
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Fournisseur</h5>
        <button className="btn btn-success" onClick={() => handleAjouter()}>
          + Ajouter
        </button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              N°
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
              colSpan={4}
            >
              Nom fournisseur
            </th>

            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              Téléphone
            </th>

            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {stateFournisseurParCategorie.map((item, index) => {
            return (
              <React.Fragment key={item.produit.id}>
                {/* Ligne produit */}
                <tr
                  style={{
                    color: "black",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => toggleRow(item.produit.id)}
                >
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    Catégorie : {index + 1}
                  </td>
                  <td style={{ border: "1px solid #000", padding: 8 }}>
                    {expandedRows[item.produit.id] ? "▼ " : "▶ "}
                    {item.produit.libelle}
                  </td>
                  <td
                    style={{ border: "1px solid #000", padding: 8 }}
                    colSpan={6}
                  ></td>
                </tr>

                {/* Lignes lots */}
                {expandedRows[item.produit.id] &&
                  item.lots.map((lot) => {
                    return (
                      <tr key={lot.id}>
                        <td
                          style={{ border: "1px solid #000", padding: 8 }}
                        ></td>

                        <td
                          style={{ border: "1px solid #000", padding: 8 }}
                          colSpan={4}
                        >
                          {lot.nom_fournisseur}
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            padding: 8,
                            textAlign: "center",
                          }}
                        >
                          {lot.telephone}
                        </td>

                        <td
                          style={{
                            border: "1px solid #000",
                            padding: 8,
                            textAlign: "center",
                          }}
                        >
                          <button
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "rgba(13, 40, 239, 1)",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleModifier(lot)}
                          >
                            Modifier
                          </button>
                          <button
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "#ef1c09ff",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleSupprimer(lot)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                {/* Ligne total */}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <ModalPetit
        show={isModalOpen}
        onClose={handleCloseModal}
        title={isEditing ? "Modifier  Fournisseur" : "Ajouter  Fournisseur"}
      >
        <FromFournisseur
          libelle={libelle}
          telephone={telephone}
          onChangeLibelle={handleChangeLibelle}
          onChangeTelephone={handleChangeTelephone}
          onChangeSelectCategorie={handleChangeSelectCategorie}
          dataCategorieFournisseur={SelectCategorieFournisseur}
          valeurCategorie={categorie_id}
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

export default Fournisseur;
