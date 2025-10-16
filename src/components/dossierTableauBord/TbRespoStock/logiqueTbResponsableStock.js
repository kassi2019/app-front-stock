// logiqueProduitProvisoire.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { useSocketProduit } from "../../Service/useSocketProduit.js";

import {
  afficherQteDisponible,
  AfficherQuantiteEnAttente,
  AfficherQuantiteExpirer,
  AfficherQteRecuParMois,
  AfficherProduitExpirer,
  DetailQuantiteDisponible,
  DetailQuantiteEnAttente,
  DetailQuantiteExpirationBientot,
  DetailQuantiteExpirationAujourdHui,
  DetailQuantiteQuantiteDetruite,
  DetailQuantiteQuantiteNonDetruite,
  AfficherEvolutionVenteParJours,
  AfficherEvolutionVenteParMois,
  AfficherEvolutionVenteParAnnee
} from "../../../Service/tableauBord.js";
export const useLogiqueTbResponsableStock = () => {
  const dispatch = useDispatch();

  // ✅ Produits depuis Redux
  const {
    stateQteDisponible,
    stateQteEnAttente,
    stateQteExpire,
    stateQteRentrantParMois,
    stateProduitExpire,
    stateDetaiQuantiteDisponible,
    stateDetaiQuantiteEnAttente,
    stateDetailQuantiteExpirationBientot,
    stateDetailQuantiteExpirationAujourdHui,
    stateDetailQuantiteQuantiteDetruite,
    stateDetailQuantiteQuantiteNonDetruite,
  } = useSelector((state) => state.tableauBord);

  // Charger les produits
  useEffect(() => {
    dispatch(afficherQteDisponible());
    dispatch(AfficherQuantiteEnAttente());
    dispatch(AfficherQuantiteExpirer());
    dispatch(AfficherQteRecuParMois());
    dispatch(AfficherProduitExpirer());
    dispatch(DetailQuantiteQuantiteDetruite());
    dispatch(DetailQuantiteExpirationAujourdHui());
    dispatch(DetailQuantiteExpirationBientot());
    dispatch(DetailQuantiteEnAttente());
    dispatch(DetailQuantiteDisponible());
    dispatch(DetailQuantiteQuantiteNonDetruite());
    dispatch(AfficherEvolutionVenteParJours());
    dispatch(AfficherEvolutionVenteParMois());
    dispatch(AfficherEvolutionVenteParAnnee());
  }, [dispatch]);

  // ✅ Changer la quantité d’un produit précis

  return {
    stateQteDisponible,
    stateQteEnAttente,
    stateQteExpire,
    stateQteRentrantParMois,
    stateProduitExpire,
    stateDetaiQuantiteDisponible,
    stateDetaiQuantiteEnAttente,
    stateDetailQuantiteExpirationBientot,
    stateDetailQuantiteExpirationAujourdHui,
    stateDetailQuantiteQuantiteDetruite,
    stateDetailQuantiteQuantiteNonDetruite,
  };
};
