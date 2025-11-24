// logiqueProduitProvisoire.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listeProduitProvisoire,
  ajouterProduitTemporellement,
  detailProduitParCode,
} from "../../Service/produit.js";
import { useSocketProduit } from "../../Service/useSocketProduit.js";
import { ajouterProduitDeVendre } from "../../Service/vente.js";
import { listeProduit } from "../../Service/produit.js";
import {
  messageErreur,
  messageSucces,
} from "../../globalComponents/Notification.js";
import { updateQuantite } from "../../Store/Produit/produit.js";
import { listeModePaiement } from "../../Service/modePaiement.js";
export const useLogiqueProduitProvisoire = () => {
  const dispatch = useDispatch();

  // ✅ Produits depuis Redux
  const { stateProduitProvisoire, optionsSelectProduit } = useSelector((state) => state.produits);
  const { SelectModePaiement } = useSelector((state) => state.modePaiement);
  // ✅ Montant reçu saisi par le caissier
  const [montantRecu, setMontantRecu] = useState(0);
  const [codeProd, setCodeProduit] = useState("");
  // ✅ Total à payer = somme (prix * quantite)
  5000;
  const montantAPayer = stateProduitProvisoire.reduce(
    (acc, lot) => acc + lot.tb_produit.prix_unitaire * (lot.quantite || 0),
    0
  );


  const [modePaiement, setSelectModePaiement] = useState(0);
  const [produit, setSelectProduit] = useState(0);
  // ✅ Monnaie rendu
  const monnaieRendu = montantRecu - montantAPayer;
  // const codeProduit = optionsSelectProduit.find(
  //   (data) =>
  //     data.value === produit

  // );
  const findProduit = (produit) => {
    return optionsSelectProduit.find(
      (item) => String(item.value) === String(produit)
    ) || null;
  };
  const handleChangeSelectProduit = (produit) => {
    const item = findProduit(produit);

    if (!item) {
      setCodeProduit("");
      return;
    }

    setCodeProduit(item.code);
  };

  // const handleChangeSelectProduit = (e) => {
  //   const selectedId = e;
  //   setSelectProduit(selectedId);
  // };
  // const handleChangeSetCodeProduit = (e) => setCodeProduit(codeProduit?.code);

  // Charger les produits
  useEffect(() => {
    dispatch(listeProduitProvisoire());
    dispatch(listeModePaiement());
    dispatch(listeProduit())

  }, [dispatch]);

  // Mise à jour temps réel
  useSocketProduit();
  const handleChangeSelectModePaiement = (e) => {
    const selectedId = e;
    setSelectModePaiement(selectedId);
  };

  const handleValider = async () => {
    const payload = {
      montant_recu: Number(montantRecu),
      montant_a_payer: Number(montantAPayer),
      monnaie_rendu: Number(monnaieRendu),
      mode_paiement_id: Number(modePaiement),
      tb_vente_detail: stateProduitProvisoire.map((lot) => ({
        produit_id: Number(lot.tb_produit.id),
        quantite: Number(lot.quantite),
        prix_unitaire: Number(lot.tb_produit.prix_unitaire),
        total: Number(lot.tb_produit.prix_unitaire * lot.quantite),
        stock_temporel_id: Number(lot.id),
      })),
    };

    try {
      if (montantRecu < montantAPayer) {
        messageErreur("Montant Récu est insuffisant !");
        return;
      } else {
        dispatch(ajouterProduitDeVendre(payload));
        setMontantRecu(0);
        setSelectModePaiement(0);
        messageSucces("Vente enregistrée avec succès ✅");
      }
    } catch (error) {
      messageErreur("Une erreur est survenue !", error);
      //   console.error("Erreur d’enregistrement ❌", error);
    }
  };

  const enregistrerProduitParCode = async (codeProd) => {
    if (!codeProd || codeProd.trim() === "") {
      messageErreur("Veuillez entrer un code produit !");
      return;
    }

    try {
      // 1️⃣ Récupérer le produit depuis backend via dispatch du thunk
      const resultAction = await dispatch(detailProduitParCode(codeProd));

      if (detailProduitParCode.fulfilled.match(resultAction)) {
        const produit = resultAction.payload;

        if (!produit) {
          messageErreur("Produit introuvable !");
          return;
        }
        // 2️⃣ Ajouter le produit temporairement
        await dispatch(ajouterProduitTemporellement({ codeProduit: codeProd }));

        // 3️⃣ Réinitialiser le champ input
        setCodeProduit("");
        messageSucces(`Produit "${produit.nom}" enregistré avec succès !`);
      } else {
        messageErreur("Produit introuvable ou erreur serveur !");
      }
    } catch (error) {
      console.error(error);
      messageErreur("Erreur lors de l'enregistrement du produit !");
    }
  };

  // ✅ Changer la quantité d’un produit précis
  const handleQuantiteChange = (id, nouvelleQuantite) => {
    dispatch(
      updateQuantite({
        id,
        quantite: Number(nouvelleQuantite) || 0, // ✅ convertit en nombre
      })
    );
  };

  return {
    stateProduitProvisoire,
    SelectModePaiement,
    montantRecu,
    setMontantRecu,
    montantAPayer,
    monnaieRendu,
    handleQuantiteChange,
    handleValider,
    codeProd,
    //handleChangeSetCodeProduit,
    enregistrerProduitParCode,
    handleChangeSelectModePaiement,
    handleChangeSelectProduit,
    produit,
    modePaiement,
    optionsSelectProduit
  };
};
