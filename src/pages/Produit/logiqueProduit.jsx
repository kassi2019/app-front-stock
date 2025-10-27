import { useEffect, useState } from "react";
import { Icons } from "../../globalComponents/Icons.jsx";
import {
  messageSucces,
  messageErreur,
} from "../../globalComponents/Notification.js";
import {
  formatMontantDevise,
  separateurChiffre,
  formatDateFR,
} from "../../globalComponents/Format";
import { useDispatch, useSelector } from "react-redux";
import {
  listeProduit,
  ajouterProduit,
  modifierLotProduit,
  afficherInformationLotParProduit,
  afficherSommePrixAchatParProduit,
  afficherSommeQuantiteParProduit,
  nombreLotProduitParId,
  quantiteActuelProduitParId,
  ajouterLotProduit,
  //   modifierStructure,
  supprimerProduit,
} from "../../Service/produit.js";
import { listeFournisseur } from "../../Service/fournisseur.js";
import { useSocketProduit } from "../../Service/useSocketProduit.js";

export const useLogiqueProduit = () => {
  const dispatch = useDispatch();
  const {
    stateProduit,
    loading,
    error,
    stateNombreLotProduit,
    stateQuantiteActuelProduit,
    
  } = useSelector((state) => state.produits);
  const { stateFournisseur } = useSelector((state) => state.fournisseurs);
  const [editingId, setEditingId] = useState(null);
  const [code, setCode] = useState("");
  const [libelle, setLibelle] = useState("");
  const [codeBarre, setCodeBarre] = useState("");
  const [unitaire, setUnitaire] = useState("");
  const [prixUnitaire, setPrixUnitaire] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [NombreProduit, setNombreProduit] = useState(0);
  const [isModalOpenAjouterLot, setIsModalOpenAjouterLot] = useState(false);
  const [quantiteActuelle, setquantiteActuelle] = useState(false);
  const [quantiteLot1, setQuantiteLot1] = useState("0");
  const [prixAchat, setPrixAchat] = useState("");
  const [fournisseur, setSelectFournisseur] = useState(null);
  const [dateExpiration, setDateExpiration] = useState("");

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
  const [modalState3, setModalState3] = useState({
    show: false,
    title: "",
    content: null,
  });
  const handleChangeSelectFournisseur = (e) => {
    const selectedId = e;
    setSelectFournisseur(selectedId);
  };
  // const handleChangeQuantite = (text) => {
  //   // si l'utilisateur tape, on remplace le 0 initial
  //   if (quantiteLot1 === "0" && text !== "") {
  //     setQuantiteLot1(text);
  //   } else {
  //     setQuantiteLot1(text);
  //   }
  // };
  const handleChangeQuantite = (e) => setQuantiteLot1(e.target.value);
  console.log({ stateFournisseur });
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCode("");
    setLibelle("");
    setCodeBarre("");
    setPrixUnitaire("");
    setUnitaire("");
    setEditingId(null);
  };
  useEffect(() => {}, [dispatch]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch(listeProduit());
  //     setNombreProduit(stateProduit.length);
  //   }, 1000); // 1000 ms = 1 seconde

  //   // Nettoyage de l’intervalle quand le composant est démonté
  //   return () => clearInterval(interval);
  // }, [dispatch, stateProduit.length]);

  useEffect(() => {
    dispatch(listeProduit());
    dispatch(listeFournisseur());
    setNombreProduit(stateProduit.length);
    if (editingId) {
      dispatch(nombreLotProduitParId(editingId));
      dispatch(quantiteActuelProduitParId(editingId));
      setquantiteActuelle(stateQuantiteActuelProduit);
    }

    // if (infoLotProduit > 0) {
    //   dispatch(afficherInformationLotParProduit(infoLotProduit));
    // }
  }, [dispatch, stateProduit.length, editingId, stateQuantiteActuelProduit]);

  // 2. Activer la mise à jour en temps réel
  useSocketProduit();

  const CodeLotProduit =
    "LOT" + "-" + "000000" + (parseInt(stateNombreLotProduit) + 1);

  const totalQuantite =
    parseInt(stateQuantiteActuelProduit) + parseInt(quantiteLot1);

  // 🔹 Gestion des changements dans les inputs
  const handleChangeCode = (e) => setCode(e.target.value);
  const handleChangeLibelle = (e) => setLibelle(e.target.value);
  const handleChangeCodeBarre = (e) => setCodeBarre(e.target.value);
  const handleChangePrixUnitaire = (e) => setPrixUnitaire(e.target.value);
  const handleChangeUnitaire = (e) => setUnitaire(e.target.value);
  // 🔹 Soumettre le formulaire (ajout ou modification)
  const handleChangePrixAchat = (e) => setPrixAchat(e.target.value);

  const handleChangeDateExpiration = (e) => setDateExpiration(e.target.value);
  const tailleProduit = "P" + "-" + "0" + (parseInt(NombreProduit) + 1);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!libelle || !prixUnitaire) {
      messageErreur("Veuillez remplir tous les champs");
      return;
    }

    const formData = {
      code: tailleProduit,
      libelle: libelle,
      prix_unitaire: Number(prixUnitaire),
      unitaire: unitaire,
    };
    // console.log(formData);
    try {
      if (editingId) {
        await dispatch().unwrap();
        //modifierStructure({ id: editingId, data: formData })
        messageSucces("Modification effectuée avec succès");
        handleCloseModal();
      } else {
        // Vérification si le Code existe déjà
        const exists = stateProduit.some((s) => s.Code === code);
        if (exists) {
          messageErreur("Ce Code existe déjà.");
          return;
        }
        await dispatch(ajouterProduit(formData)).unwrap();
        messageSucces("Enregistrement effectué avec succès");
        setCode("");
        setLibelle("");
        setCodeBarre("");
        setPrixUnitaire("");
        setUnitaire("");
      }
    } catch (error) {
      messageErreur("Une erreur est survenue !", error);
    }
  };

  // Ouvrir le modal Ajouter
  const handleAjouter = () => {
    setEditingId(null);
    setCode("");
    setLibelle("");
    setCodeBarre("");
    setPrixUnitaire("");
    setUnitaire("");
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Ouvrir le modal Modifier
  const handleModifier = (row) => {
    setEditingId(row.id);
    setCode(row.Code);
    setLibelle(row.libelle);
    setCodeBarre(row.codeBarre);
    setPrixUnitaire(row.prixUnitaire);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAjouteLot = (row) => {
    setEditingId(row.id);
    setCode(row.code);
    setLibelle(row.libelle);
    setCodeBarre(row.codeBarre);
    setPrixUnitaire(row.prix_unitaire);
    setIsEditing(true);
    setIsModalOpenAjouterLot(true);
    // const data = afficherInformationLotParProduit(row.id);
    // const data = await afficherInformationLotParProduit(row.id);
  };

  const handleCloseModalAjouterLot = () => {
    setIsModalOpenAjouterLot(false);
    setCode("");
    setLibelle("");
    setCodeBarre("");
    setPrixUnitaire("");
    setUnitaire("");
    setEditingId(null);
  };
  const confirmerSuppression = async (id) => {
    console.log(id);
    try {
      await dispatch(supprimerProduit(id)).unwrap();
      messageSucces("Suppression effectuée avec succès");
      setModalState({ ...modalState, show: false }); // Fermer le modal
    } catch (error) {
      messageErreur("Erreur lors de la suppression", error);
    }
  };
  const EnregistrementProduitLot = async (e) => {
    e.preventDefault();

    if (!quantiteLot1 || !prixAchat) {
      messageErreur("Veuillez remplir tous les champs");
      return;
    }

    const formData = {
      produit_id: editingId,
      code_lot: CodeLotProduit,
      expiration_date: dateExpiration,
      quantite: Number(quantiteLot1),
      prix_achat: Number(prixAchat),
      fournisseur_id: Number(fournisseur),
    };
    // console.log(formData);
    try {
      await dispatch(ajouterLotProduit(formData)).unwrap();
      messageSucces("Enregistrement effectué avec succès");
      setQuantiteLot1("");
      setPrixAchat("");
      setSelectFournisseur("");
      setDateExpiration("");
      handleCloseModalAjouterLot();
    } catch (error) {
      messageErreur("Une erreur est survenue !", error);
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
            Voulez-vous vraiment supprimer le produit{" "}
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

  const handleDetail = async (row) => {
    try {
      // Appel API
      const data = await afficherInformationLotParProduit(row.id);
      const sommePrixAchat = await afficherSommePrixAchatParProduit(row.id);
      const sommeQuantite = await afficherSommeQuantiteParProduit(row.id);

      if (!data) {
        console.warn("Aucun lot trouvé");
        return;
      }

      const { produit, lots } = data;

      // Ouvre le modal avec infos produit + lots
      setModalState2({
        show: true,
        title: "Information sur le lot de produit",
        content: (
          <div>
            {/* --- Produit --- */}
            <div
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                marginBottom: "10px",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              Information sur le produit
            </div>
            <table className="table table-bordered">
              <thead>
                <tr
                  style={{
                    backgroundColor: "rgba(21, 162, 244, 1)",
                    color: "white",
                  }}
                >
                  <th
                    style={{
                      width: "10%",
                      backgroundColor: "rgba(21, 162, 244, 1)",
                      color: "white",
                    }}
                  >
                    Code
                  </th>
                  <th
                    style={{
                      width: "50%",
                      backgroundColor: "rgba(21, 162, 244, 1)",
                      color: "white",
                    }}
                  >
                    Libellé
                  </th>

                  <th
                    style={{
                      width: "10%",
                      backgroundColor: "rgba(21, 162, 244, 1)",
                      color: "white",
                    }}
                  >
                    Prix unitaire
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{produit.code}</td>
                  <td>{produit.libelle}</td>
                  <td style={{ textAlign: "right" }}>
                    {separateurChiffre(produit.prix_unitaire)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* --- Lots --- */}
            <div
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                marginBottom: "10px",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              Information sur le lot
            </div>
            <table className="table table-bordered">
              <thead>
                <tr
                  style={{
                    backgroundColor: "hsla(186, 91%, 26%, 1.00)",
                    color: "white",
                  }}
                >
                  <th style={{ width: "2%" }}>N°</th>
                  <th style={{ width: "10%" }}>Code</th>
                  <th style={{ width: "10%" }}>Date d'expiration</th>
                  <th style={{ width: "10%" }}>Quantité du lot</th>
                  <th style={{ width: "10%" }}>Prix Achat</th>
                  <th style={{ width: "10%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {lots.length > 0 ? (
                  lots.map((lot, index) => (
                    <tr key={lot.code_lot} style={{ textAlign: "center" }}>
                      <td>{index + 1}</td>
                      <td>{lot.code_lot}</td>
                      <td>{formatDateFR(lot.expiration_date)}</td>
                      <td style={{ textAlign: "right" }}>
                        {separateurChiffre(lot.quantite)}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {formatMontantDevise(lot.prix_achat)}
                      </td>

                      {/* Boutons actions */}
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleModifierLot(lot)}
                          style={{ marginRight: "5px" }}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleSupprimer(lot.code_lot)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      Aucun lot trouvé
                    </td>
                  </tr>
                )}

                {/* Ligne Total */}
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      backgroundColor: "hsla(186, 91%, 26%, 1.00)",
                      color: "white",
                    }}
                  >
                    TOTAL
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {separateurChiffre(sommeQuantite)}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {formatMontantDevise(sommePrixAchat)}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des lots :", error);
    }
  };
  // 🟢 Fonction pour modifier un lot
  const handleModifierLot = (lot) => {
    setModalState3({
      show: true,
      title: "Modifier le lot",
      content: (
        <div>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Modification du lot : {lot.code_lot}
          </div>

          <div className="form-group mb-3">
            <label>Code Lot</label>
            <input
              type="text"
              defaultValue={lot.code_lot}
              className="form-control"
              disabled // généralement on ne change pas le code du lot
            />
          </div>

          <div className="form-group mb-3">
            <label>Date d'expiration</label>
            <input
              type="date"
              defaultValue={lot.expiration_date?.substring(0, 10)} // format YYYY-MM-DD
              className="form-control"
              id="expiration_date_input"
            />
          </div>

          <div className="form-group mb-3">
            <label>Quantité</label>
            <input
              type="number"
              defaultValue={lot.quantite}
              className="form-control"
              id="quantite_input"
            />
          </div>

          <div className="form-group mb-3">
            <label>Prix Achat</label>
            <input
              type="number"
              step="0.01"
              defaultValue={lot.prix_achat}
              className="form-control"
              id="prix_achat_input"
            />
          </div>

          <div style={{ textAlign: "right" }}>
            <button
              className="btn btn-secondary"
              onClick={() => {
                // Fermer le modal de modification
                setModalState3({ show: false });

                // Réafficher le détail du produit et ses lots
                handleDetail({ id: lot.produit_id, ...lot.tb_produit });
              }}
              style={{ marginRight: "10px" }}
            >
              Annuler
            </button>
            <button
              className="btn btn-success"
              onClick={async () => {
                try {
                  const updatedData = {
                    code_lot: lot.code_lot, // inchangé car disabled
                    expiration_date: document.getElementById(
                      "expiration_date_input"
                    ).value,
                    quantite: Number(
                      document.getElementById("quantite_input").value
                    ),
                    prix_achat: Number(
                      document.getElementById("prix_achat_input").value
                    ),
                    idProduit: lot.idProduit, // utile pour rafraîchir après modif
                  };

                  // Appeler ton thunk Redux avec {id, data}
                  await dispatch(
                    modifierLotProduit({ id: lot.id, data: updatedData })
                  );

                  messageSucces("Modification effectuée avec succès");
                  setModalState3({ show: false });
                  setModalState2({ show: false });
                } catch (error) {
                  messageErreur("Une erreur est survenue !");
                  console.log("Erreur API :", error);
                }
              }}
            >
              Modifier
            </button>
          </div>
        </div>
      ),
    });
  };

  // Fermer le modal

  const columns = [
    {
      key: "code",
      title: "Code",
      width: "10%",
    },
    {
      key: "libelle",
      title: "Libelle",
      width: "35%",
    },

    {
      key: "prix_unitaire",
      title: "Prix Unitaire",
      width: "15%",
    },
    {
      key: "unitaire",
      title: "Unité",
      width: "10%",
    },
    {
      key: "code_barre",
      title: "Code Barre",
      width: "10%",
    },
  ];
  const actions = [
    // {
    //   label: "Modifier",
    //   color: "blue",
    //   icon: Icons.edit,
    //   onClick: (row) => {
    //     handleModifier(row);
    //   },
    // },
    {
      label: "Ajouter Lot",
      color: "green",
      // icon: Icons.edit,
      onClick: (row) => {
        handleAjouteLot(row);
      },
    },
    {
      //label: "Voir Lot",
      title: "Voir Lot",
      color: "blue",
      icon: Icons.view,
      onClick: (row) => {
        handleDetail(row);
      },
    },
    {
      // label: "Supprimer",
      color: "red",
      icon: Icons.delete,
      onClick: (row) => {
        handleSupprimer(row);
      },
    },
  ];

  return {
    tailleProduit,
    stateProduit,
    stateFournisseur,
    loading,
    error,
    actions,
    columns,
    // Champs
    code,
    libelle,
    codeBarre,
    prixUnitaire,
    CodeLotProduit,
    unitaire,
    handleChangeUnitaire,
    handleChangeCode,
    handleChangeLibelle,
    handleChangeCodeBarre,
    handleChangePrixUnitaire,
    handleChangePrixAchat,
    prixAchat,
    handleSubmit,
    handleCloseModalAjouterLot,
    handleChangeDateExpiration,
    dateExpiration,
    // Modal
    isModalOpen,
    isModalOpenAjouterLot,
    isEditing,
    editingId,
    handleAjouter,
    handleModifier,
    handleSupprimer,
    handleCloseModal,
    modalState,
    setModalState,
    setModalState2,
    modalState2,
    modalState3,

    totalQuantite,
    handleChangeQuantite,
    quantiteActuelle,
    quantiteLot1,
    fournisseur,
    handleChangeSelectFournisseur,
    EnregistrementProduitLot,
  };
};
