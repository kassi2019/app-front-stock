import { createSlice } from "@reduxjs/toolkit";
import { listeModePaiement } from "../../Service/modePaiement.js";

const modePaiementSlice = createSlice({
  name: "modePaiement",
  initialState: {
    stateModePaiement: [],
    SelectModePaiement: [],
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
      .addCase(listeModePaiement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listeModePaiement.fulfilled, (state, action) => {
        state.loading = false;
        state.stateModePaiement = action.payload.data || action.payload;

        state.SelectModePaiement = action.payload.data?.map((item) => ({
          value: item.id, // ou item.niveau
          label: item.libelle,
        }));
        // Adjust based on your API response structure
      })
      .addCase(listeModePaiement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      });
  },
});

export default modePaiementSlice.reducer;
