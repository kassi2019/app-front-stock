// logiqueProduitProvisoire.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { useSocketProduit } from "../../Service/useSocketProduit.js";

import {
  afficherResultatPan,
  evolutionParJoursCaissier

} from "../../../Service/tableauBord.js";
export const useLogiqueTbCaissier = () => {
  const dispatch = useDispatch();

  // ✅ Produits depuis Redux
  const {
    stateAffichePanCaissier,
    stateEvolutionVenduParJoursCaissier,
  } = useSelector((state) => state.tableauBordCaissier);

  // Charger les produits
  useEffect(() => {
    dispatch(afficherResultatPan());
    dispatch(evolutionParJoursCaissier());
  }, [dispatch]);

  // ✅ Changer la quantité d’un produit précis

  return {
    stateAffichePanCaissier,
    stateEvolutionVenduParJoursCaissier,
  };
};
