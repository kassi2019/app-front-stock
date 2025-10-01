import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";

export const listeCategorieFournisseur = createAsyncThunk(
  "CategorieFournisseur/CategorieFournisseur",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/categoriefournisseur/liste"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération des produit"
      );
    }
  }
);
export const ajouterCategorieFournisseur = createAsyncThunk(
  "ajouterCategorieFournisseur/ajouterCategorieFournisseur",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/categorieFournisseur/creer", data); // <-- adapte cette route à ton backend
      thunkAPI.dispatch(listeCategorieFournisseur());
      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération des produit"
      );
    }
  }
);

export const modifierCategorieFournisseur = createAsyncThunk(
  "modifierCategorie/modifierCategorie",
 
  async ({ id, data }, thunkAPI) => {
    console.log("modifierCategorieFournisseur", id, data);
    try {
      const res = await api.put(`/categorieFournisseur/modifier/${id}`, data);
      thunkAPI.dispatch(listeCategorieFournisseur());
      // thunkAPI.dispatch(afficherInformationLotParProduit(data?.idProduit));
      return res.data; // Retourne la structure modifiée
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la modification du lot"
      );
    }
  }
);

export const supprimerCategorieFournisseur = createAsyncThunk(
  "supprimerCategorieFournisseur/supprimerCategorieFournisseur",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/categorieFournisseur/supprimer/${id}`);
      thunkAPI.dispatch(listeCategorieFournisseur());
      return res.data; // On retourne l'ID supprimé pour le retirer du store
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la suppression du produit"
      );
    }
  }
);
