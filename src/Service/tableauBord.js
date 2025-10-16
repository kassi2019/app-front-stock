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

export const DetailQuantiteDisponible = createAsyncThunk(
  "DetailDisponible/DetailDisponible",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tableau-bord/detail-stock-disponible"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);

export const DetailQuantiteEnAttente = createAsyncThunk(
  "DetailAttente/DetailAttente",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tableau-bord/detail-quantite-en-attente"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);

export const DetailQuantiteExpirationBientot = createAsyncThunk(
  "ExpirationBientot/ExpirationBientot",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(
        "/tableau-bord/detail-quantite-expiration-bientot"
      ); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);

export const DetailQuantiteExpirationAujourdHui = createAsyncThunk(
  "ExpirationAujourdHui/ExpirationAujourdHui",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(
        "/tableau-bord/detail-quantite-expiration-aujourd-hui"
      ); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);

export const DetailQuantiteQuantiteDetruite = createAsyncThunk(
  "QuantiteDetruite/QuantiteDetruite",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tableau-bord/detail-quantite-Detruite"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);

export const DetailQuantiteQuantiteNonDetruite = createAsyncThunk(
  "QuantiteNonDetruite/QuantiteNonDetruite",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tableau-bord/detail-quantite-Non-Detruite"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);

export const AfficherEvolutionVenteParJours = createAsyncThunk(
  "EvolutionParJours/EvolutionParJours",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tableau-bord/evolution-vente-par-jour"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);

export const AfficherEvolutionVenteParMois = createAsyncThunk(
  "EvolutionParMois/EvolutionParMois",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tableau-bord/evolution-vente-par-mois"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);

export const AfficherEvolutionVenteParAnnee = createAsyncThunk(
  "EvolutionParAnnee/EvolutionParAnnee",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tableau-bord/evolution-vente-par-annee"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération"
      );
    }
  }
);
