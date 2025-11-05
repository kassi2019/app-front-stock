import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  messageErreur,
  messageSucces,
} from "../../globalComponents/Notification";
import {
  ajouterModePaiement,
  modifierModePaiement,
  supprimerModePaiement,
  listeModePaiement,
} from "../../Service/modePaiement";
import { Icons } from "../../globalComponents/Icons";

function UseLogiqueModePaiement() {
  const dispatch = useDispatch();
  const { stateModePaiement, loading, error } = useSelector(
    (state) => state.modePaiement
  );
  const [editingId, setEditingId] = useState(null);

  const [libelle, setLibelle] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // const [infoLotProduit, setinfoLotProduit] = useState(0);
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    content: null,
  });
  const [modalState2, setModalState2] = useState({
    show: false,
    title: "",
    content: null,
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setLibelle("");

    setEditingId(null);
  };

  useEffect(() => {
    dispatch(listeModePaiement());
  }, [dispatch, stateModePaiement.length]);

  const handleChangeLibelle = (e) => setLibelle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!libelle) {
      messageErreur("Veuillez remplir le champs");
      return;
    }
    console.log({ editingId });
    const formData = {                                                                                                                                                                                                                                        
      libelle: libelle,
    };
    // console.log(formData);
    try {
      if (editingId) {
        await dispatch(
          modifierModePaiement({ id: editingId, data: formData })
        ).unwrap();
        messageSucces("Modification effectuée avec succès");
        handleCloseModal();
      } else {
        // Vérification si le Code existe déjà
        // const exists = stateModePaiement.some((s) => s.Code === code);
        // if (exists) {
        //   messageErreur("Ce Code existe déjà.");
        //   return;
        // }
        await dispatch(ajouterModePaiement(formData)).unwrap();
        messageSucces("Enregistrement effectué avec succès");

        setLibelle("");
      }
    } catch (error) {
      messageErreur("Une erreur est survenue !", error);
    }
  };

  // Ouvrir le modal Ajouter
  const handleAjouter = () => {
    setEditingId(null);

    setLibelle("");

    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Ouvrir le modal Modifier
  const handleModifier = (row) => {
    console.log({ row });
    setEditingId(row.id);

    setLibelle(row.libelle);

    setIsEditing(true);
    setIsModalOpen(true);
  };
  const confirmerSuppression = async (id) => {
    console.log(id);
    try {
      await dispatch(supprimerModePaiement(id)).unwrap();
      messageSucces("Suppression effectuée avec succès");
      setModalState({ ...modalState, show: false }); // Fermer le modal
    } catch (error) {
      messageErreur("Erreur lors de la suppression", error);
    }
  };

  // Ouvrir le modal Supprimer
  const handleSupprimer = (row) => {
    setModalState({
      show: true,
      title: "Confirmer la suppression",
      content: (
        <div>
          <p>
            Voulez-vous vraiment supprimer ce mode de paiement{" "}
            <strong> {row.libelle}</strong> ?
          </p>
          <div className="d-flex justify-content-end">
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

  // Fermer le modal

  const columns = [
    {
      key: "libelle",
      title: "Libelle",
      width: "90%",
    },
  ];
  const actions = [
    {
      //label: "Modifier",
      color: "#FFC107",
      icon: Icons.edit,
      onClick: (row) => {
        handleModifier(row);
      },
    },

    {
      //label: "Supprimer",
      color: "red",
      icon: Icons.delete,
      onClick: (row) => {
        handleSupprimer(row);
      },
    },
  ];

  return {
    stateModePaiement,
    loading,
    error,
    actions,
    columns,
    libelle,
    handleChangeLibelle,

    handleSubmit,
    // Modal
    isModalOpen,
    isEditing,
    handleAjouter,
    handleModifier,
    handleSupprimer,
    handleCloseModal,
    modalState,
    setModalState,
    setModalState2,
    modalState2,
  };
}

export default UseLogiqueModePaiement;
