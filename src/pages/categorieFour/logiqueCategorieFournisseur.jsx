import { useEffect, useState } from "react";
import { Icons } from "../../globalComponents/Icons.jsx";
import {
  messageSucces,
  messageErreur,
} from "../../globalComponents/Notification.js";
// import {
//   formatMontantDevise,
//   separateurChiffre,
//   formatDateFR,
// } from "../../globalComponents/Format";
import { useDispatch, useSelector } from "react-redux";
import {
  listeCategorieFournisseur,
  ajouterCategorieFournisseur,
  modifierCategorieFournisseur,

  //   modifierStructure,
  supprimerCategorieFournisseur,
} from "../../Service/categorieFournisseur.js";
//import { useSocketProduit } from "../../Service/useSocketProduit.js";

export const useLogiqueCategorieFournisseur = () => {
  const dispatch = useDispatch();
  const { stateCategorieFournisseur, loading, error } = useSelector(
    (state) => state.categorieFournisseurs
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch(listeCategorieFournisseur());
  //     setNombreProduit(stateCategorieFournisseur.length);
  //   }, 1000); // 1000 ms = 1 seconde

  //   // Nettoyage de l’intervalle quand le composant est démonté
  //   return () => clearInterval(interval);
  // }, [dispatch, stateCategorieFournisseur.length]);

  useEffect(() => {
    dispatch(listeCategorieFournisseur());

    // if (infoLotProduit > 0) {
    //   dispatch(afficherInformationLotParProduit(infoLotProduit));
    // }
  }, [dispatch, stateCategorieFournisseur.length]);

  // 2. Activer la mise à jour en temps réel
  //   useSocketProduit();

  // 🔹 Gestion des changements dans les inputs

  const handleChangeLibelle = (e) => setLibelle(e.target.value);

  // 🔹 Soumettre le formulaire (ajout ou modification)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!libelle) {
      messageErreur("Veuillez remplir tous les champs");
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
          modifierCategorieFournisseur({ id: editingId, data: formData })
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
        await dispatch(ajouterCategorieFournisseur(formData)).unwrap();
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
      await dispatch(supprimerCategorieFournisseur(id)).unwrap();
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
            Voulez-vous vraiment supprimer la categorie{" "}
            <strong> {row.libelle}</strong> ?
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
      label: "Modifier",
      color: "#FFC107",
      icon: Icons.edit,
      onClick: (row) => {
        handleModifier(row);
      },
    },

    {
      label: "Supprimer",
      color: "red",
      icon: Icons.delete,
      onClick: (row) => {
        handleSupprimer(row);
      },
    },
  ];

  return {
    stateCategorieFournisseur,
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
};
