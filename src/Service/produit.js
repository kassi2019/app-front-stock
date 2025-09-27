import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";

export const listeProduit = createAsyncThunk(
  "produit/produits",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/produit/liste"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération des produit"
      );
    }
  }
);

export const rechercheCodeBarre = createAsyncThunk(
  "code/codeBarre",
  async (code_barre, thunkAPI) => {
    try {
      const res = await api.get(`/produit/${code_barre}`);
      return res.data.data; // on ne garde que le tableau des utilisateurs
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data ||
          "Erreur lors de l'affichage des utilisateurs par niveau structure"
      );
    }
  }
);

export const ajouterProduit = createAsyncThunk(
  "produit/add",
  async (nouvelleTypeEquipement, thunkAPI) => {
    try {
      const res = await api.post("/produit/creer", nouvelleTypeEquipement);
      thunkAPI.dispatch(listeProduit());
      return res.data; // Retourne la structure ajoutée
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de l'ajout de type Equipement"
      );
    }
  }
);

export const supprimerProduit = createAsyncThunk(
  "deleteproduit/deleteproduit",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/produit/supprimer/${id}`);
      thunkAPI.dispatch(listeProduit());
      return res.data; // On retourne l'ID supprimé pour le retirer du store
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la suppression du produit"
      );
    }
  }
);

// export const afficherInformationLotParProduit = createAsyncThunk(
//   "informationLot/idProduit",
//   async (idProduit, thunkAPI) => {
//     try {
//       const res = await api.get(`/produit/informationProduit/${idProduit}`);
//       return res.data; // on ne garde que le tableau des utilisateurs
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data ||
//           "Erreur lors de l'affichage des produit"
//       );
//     }
//   }
// );

export const afficherInformationLotParProduit = async (idProduit) => {
  try {
    const res = await api.get(`/produit/informationProduit/${idProduit}`);
    return res.data; // tableau de lots
  } catch (error) {
    console.error("Erreur API lots :", error);
    return [];
  }
};

export const afficherSommeQuantiteParProduit = async (idProduit) => {
  try {
    const res = await api.get(`/produit/sommeQuantite/${idProduit}`);
    return res.data; // tableau de lots
  } catch (error) {
    console.error("Erreur API lots :", error);
    return 0;
  }
};

export const afficherSommePrixAchatParProduit = async (idProduit) => {
  try {
    const res = await api.get(`/produit/sommePrixAchat/${idProduit}`);
    return res.data; // tableau de lots
  } catch (error) {
    console.error("Erreur API lots :", error);
    return 0;
  }
};

export const modifierLotProduit = createAsyncThunk(
  "LotProduit/LotProduit",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/produit/modifier/lotProduit/${id}`, data);
      // thunkAPI.dispatch(afficherInformationLotParProduit(data?.idProduit));
      return res.data; // Retourne la structure modifiée
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la modification du lot"
      );
    }
  }
);

export const listeProduitProvisoire = createAsyncThunk(
  "produitProvisoire/produitsProvisoire",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/produit/listeProduitEnSortie"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération des produit"
      );
    }
  }
);
