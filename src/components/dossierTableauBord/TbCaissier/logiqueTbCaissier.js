// logiqueProduitProvisoire.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { useSocketProduit } from "../../Service/useSocketProduit.js";

import {
  afficherResultatPan,
  evolutionParJoursCaissier,
  EvolutionQteParJoursModePaiement,
} from "../../../Service/tableauBord.js";
export const useLogiqueTbCaissier = () => {
  const dispatch = useDispatch();

  // ✅ Produits depuis Redux
  const {
    stateAffichePanCaissier,
    stateEvolutionVenduParJoursCaissier,
    stateEvolutionQteVenduParModePaiement,
  } = useSelector((state) => state.tableauBordCaissier);

  // Charger les produits
  useEffect(() => {
    dispatch(afficherResultatPan());
    dispatch(evolutionParJoursCaissier());
    dispatch(EvolutionQteParJoursModePaiement());
  }, [dispatch]);

  // ✅ Changer la quantité d’un produit précis

  return {
    stateAffichePanCaissier,
    stateEvolutionVenduParJoursCaissier,
    stateEvolutionQteVenduParModePaiement,
  };
};
