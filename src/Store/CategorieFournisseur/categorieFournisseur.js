import { createSlice } from "@reduxjs/toolkit";
import { listeCategorieFournisseur } from "../../Service/categorieFournisseur.js";

const categorieFournisseurSlice = createSlice({
  name: "structures",
  initialState: {
    stateCategorieFournisseur: [],
    SelectCategorieFournisseur: [],
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
      .addCase(listeCategorieFournisseur.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listeCategorieFournisseur.fulfilled, (state, action) => {
        state.loading = false;
        state.stateCategorieFournisseur = action.payload.data || action.payload;

        state.SelectCategorieFournisseur = action.payload.data.map((item) => ({
          value: item.id, // ou item.niveau
          label: item.libelle,
        }));
        // Adjust based on your API response structure
      })
      .addCase(listeCategorieFournisseur.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      });
  },
});

export default categorieFournisseurSlice.reducer;
