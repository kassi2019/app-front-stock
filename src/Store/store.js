import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Login/login";
import produitReducer from "./Produit/produit";
import fournisseurReducer from "./Fournisseur/fournisseur";
import categorieFournisseurReducer from "./CategorieFournisseur/categorieFournisseur";
import tableauBordReducer from "./TableauBord/tableauBord";
// import { setupListeners } from '@reduxjs/toolkit/query'
// import { api } from '../Service/api'
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
    fournisseurs: fournisseurReducer,
    categorieFournisseurs: categorieFournisseurReducer,
    tableauBord: tableauBordReducer,
    // [api.reducerPath]: api.reducer,
    // structures: structureReducer,
    // structuresPlans: planStructureReducer,
    // roles: roleReducer,
    // utilisateurs: utilisateurReducer,
    // repartitions: repartitionSiteReducer,
    // typeEquipements: typeEquipementReducer,
    // equipements: equipementReducer,
  },
});
