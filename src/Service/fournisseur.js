import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";

export const ajouterFournisseur = createAsyncThunk(
  "Fournisseur/ajouterFournisseur",
  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/entreprise/creer", payload);

      thunkAPI.dispatch(fournisseurParCategorie());
      return res.data; // Données renvoyées par ton controller NestJS
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de l'ajout de la categorie"
      );
    }
  }
);

export const listeFournisseur = createAsyncThunk(
  "Fournisseur/listeFournisseur",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/entreprise/liste"); // <-- adapte cette route à ton backend
      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération des fournisseur"
      );
    }
  }
);

export const modifierFournisseur = createAsyncThunk(
  "modifierFournisseur/modifierFournisseur",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/entreprise/modifier/${id}`, data);
      thunkAPI.dispatch(fournisseurParCategorie());
      // thunkAPI.dispatch(afficherInformationLotParProduit(data?.idProduit));
      return res.data; // Retourne la structure modifiée
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la modification du lot"
      );
    }
  }
);
export const supprimerFournisseur = createAsyncThunk(
  "supprimerFournisseur/supprimerFournisseur",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/entreprise/supprimer/${id}`);
      thunkAPI.dispatch(fournisseurParCategorie());
      // thunkAPI.dispatch(afficherInformationLotParProduit(data?.idProduit));
      return res.data; // Retourne la structure modifiée
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la modification du lot"
      );
    }
  }
);

export const fournisseurParCategorie = createAsyncThunk(
  "fournisseurParCat/fournisseurParCat",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/entreprise/listeFournisseurParCatgorie"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération des produit"
      );
    }
  }
);
