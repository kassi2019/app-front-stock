// logiqueProduitProvisoire.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listeProduitProvisoire } from "../../Service/produit.js";
import { useSocketProduit } from "../../Service/useSocketProduit.js";
import { ajouterProduitDeVendre } from "../../Service/vente.js";
import {
  messageErreur,
  messageSucces,
} from "../../globalComponents/Notification.js";
import { updateQuantite } from "../../Store/Produit/produit.js";
export const useLogiqueProduitProvisoire = () => {
  const dispatch = useDispatch();

  // ✅ Produits depuis Redux
  const { stateProduitProvisoire } = useSelector((state) => state.produits);

  // ✅ Montant reçu saisi par le caissier
  const [montantRecu, setMontantRecu] = useState(0);

    // ✅ Total à payer = somme (prix * quantite)
    5000
  const montantAPayer = stateProduitProvisoire.reduce(
    (acc, lot) => acc + lot.tb_produit.prix_unitaire * (lot.quantite || 0),
    0
  );

  // ✅ Monnaie rendu
  const monnaieRendu = montantRecu - montantAPayer;

  // Charger les produits
  useEffect(() => {
    dispatch(listeProduitProvisoire());
  }, [dispatch]);

  // Mise à jour temps réel
  useSocketProduit();

  const handleValider = async () => {
    const payload = {
      montant_recu: Number(montantRecu),
      montant_a_payer: Number(montantAPayer),
      monnaie_rendu: Number(monnaieRendu),

      tb_vente_detail: stateProduitProvisoire.map((lot) => ({
        produit_id: Number(lot.tb_produit.id),
        quantite: Number(lot.quantite),
        prix_unitaire: Number(lot.tb_produit.prix_unitaire),
        total: Number(lot.tb_produit.prix_unitaire * lot.quantite),
      })),
    };

    try {
      dispatch(ajouterProduitDeVendre(payload));
      setMontantRecu(0);
      messageSucces("Vente enregistrée avec succès ✅");
    } catch (error) {
      messageErreur("Une erreur est survenue !", error);
      //   console.error("Erreur d’enregistrement ❌", error);
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
    montantRecu,
    setMontantRecu,
    montantAPayer,
    monnaieRendu,
    handleQuantiteChange,
    handleValider,
  };
};
