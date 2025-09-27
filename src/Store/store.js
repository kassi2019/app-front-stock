import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Login/login";
import produitReducer from "./Produit/produit";
// import structureReducer from './Structure/structure'
// import planStructureReducer from './PlanStructure/planStructure'
// import roleReducer from './Role/role'
// import utilisateurReducer from './Utilisateur/utilisateur'
// import repartitionSiteReducer from './RepartitionSite/repartitionSite'
// import typeEquipementReducer from './TypeEquipement/typeEquipement'
// import equipementReducer from './Equipement/equipement'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    produits: produitReducer,
    // structures: structureReducer,
    // structuresPlans: planStructureReducer,
    // roles: roleReducer,
    // utilisateurs: utilisateurReducer,
    // repartitions: repartitionSiteReducer,
    // typeEquipements: typeEquipementReducer,
    // equipements: equipementReducer,
  },
});
