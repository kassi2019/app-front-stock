import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";

export const ajouterProduitDeVendre = createAsyncThunk(
  "vente/ajouterVente",
  async (payload, thunkAPI) => {
    try {
      // payload = JSON que ton backend attend (CreateVenteDto)
      const res = await api.post("/vente/ajouterVente", payload);

      return res.data; // Données renvoyées par ton controller NestJS
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de l'ajout de la vente"
      );
    }
  }
);
