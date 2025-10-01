import { createSlice } from "@reduxjs/toolkit";
import {

  fournisseurParCategorie,
} from "../../Service/fournisseur.js";

const fournisseurSlice = createSlice({
  name: "structures",
  initialState: {
  
    stateFournisseurParCategorie: [],
   
    loading: false,
    error: null,
  },
  reducers: {
    // updateQuantite: (state, action) => {
    //   const { id, quantite } = action.payload;
    //   const produit = state.stateProduitProvisoire.find((p) => p.id === id);
    //   if (produit) {
    //     produit.quantite = quantite; // ✅ met bien à jour uniquement ce produit
    //   }
    // },
    // updateQuantiteTheorie: (state, action) => {
    //   const { id, quantite_theorique } = action.payload;
    //   const produit = state.stateProduitInventaire.find((p) => p.id === id);
    //   if (produit) {
    //     produit.quantite_theorique = quantite_theorique; // ✅ met bien à jour uniquement ce produit
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fournisseurParCategorie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fournisseurParCategorie.fulfilled, (state, action) => {
        state.loading = false;
        state.stateFournisseurParCategorie =
          action.payload.data || action.payload;
      })
      .addCase(fournisseurParCategorie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      });
  },
});

export default fournisseurSlice.reducer;
