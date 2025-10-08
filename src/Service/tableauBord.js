import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";

export const afficherQteDisponible = createAsyncThunk(
  "afficherQteDisponible/afficherQteDisponible",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tableau-bord/quantite-disponible"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);

export const AfficherQuantiteEnAttente = createAsyncThunk(
  "AfficherQuantiteEnAttente/AfficherQuantiteEnAttente",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tableau-bord/quantite-en-attente"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);
export const AfficherQuantiteExpirer = createAsyncThunk(
  "AfficherQuantiteExpirer/AfficherQuantiteExpirer",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tableau-bord/quantite-expirer"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);

export const AfficherQteRecuParMois = createAsyncThunk(
  "AfficherQteRecuParMois/AfficherQteRecuParMois",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tableau-bord/quantite-par-mois"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);


export const AfficherProduitExpirer = createAsyncThunk(
  "AfficherProduitExpirer/AfficherProduitExpirer",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tableau-bord/pertes-expiration"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);