import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";

export const listeModePaiement = createAsyncThunk(
  "ModePaiement/ModePaiement",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/mode-paiement/liste"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération des produit"
      );
    }
  }
);
export const ajouterModePaiement = createAsyncThunk(
  "ajouterModePaiement/ajouterModePaiement",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/mode-paiement/creer", data); // <-- adapte cette route à ton backend
      thunkAPI.dispatch(listeModePaiement());
      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération des produit"
      );
    }
  }
);

export const modifierModePaiement = createAsyncThunk(
  "modifierCategorie/modifierCategorie",
 
  async ({ id, data }, thunkAPI) => {
    
    try {
      const res = await api.put(`/mode-paiement/modifier/${id}`, data);
      thunkAPI.dispatch(listeModePaiement());
      // thunkAPI.dispatch(afficherInformationLotParProduit(data?.idProduit));
      return res.data; // Retourne la structure modifiée
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la modification du lot"
      );
    }
  }
);

export const supprimerModePaiement = createAsyncThunk(
  "supprimerModePaiement/supprimerModePaiement",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/mode-paiement/supprimer/${id}`);
      thunkAPI.dispatch(listeModePaiement());
      return res.data; // On retourne l'ID supprimé pour le retirer du store
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la suppression du produit"
      );
    }
  }
);
