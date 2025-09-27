import { createSlice } from "@reduxjs/toolkit";
import {
  listeProduit,
  listeProduitProvisoire,
  //   ajouterStructure,
  //   modifierStructure,
  //   supprimerStructure,
} from "../../Service/produit";

const produitSlice = createSlice({
  name: "structures",
  initialState: {
    stateProduit: [],
    stateProduitProvisoire: [],
    optionsSelect: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateQuantite: (state, action) => {
      const { id, quantite } = action.payload;
      const produit = state.stateProduitProvisoire.find((p) => p.id === id);
      if (produit) {
        produit.quantite = quantite; // ✅ met bien à jour uniquement ce produit
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listeProduit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listeProduit.fulfilled, (state, action) => {
        state.loading = false;
        state.stateProduit = action.payload.data || action.payload;

        state.optionsSelect = action.payload.data.map((item) => ({
          value: item.id, // ou item.niveau
          label: item.libelle,
          niveau: item.niveau,
        }));
        // Adjust based on your API response structure
      })
      .addCase(listeProduit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(listeProduitProvisoire.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listeProduitProvisoire.fulfilled, (state, action) => {
        state.loading = false;
        state.stateProduitProvisoire = action.payload.map((p) => ({
          ...p,
          quantite: p.quantite ?? 0, // ✅ toujours un nombre
        }));
      })

      .addCase(listeProduitProvisoire.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      });
    //  .addCase(modifierLotProduit.fulfilled, (state, action) => {
    //         const index = state.stateStructure.findIndex(
    //           (s) => s.id === action.payload.data.id
    //         );
    //         if (index !== -1) state.stateStructure[index] = action.payload.data;
    //       })
    // Ajout
    // .addCase(ajouterStructure.fulfilled, (state, action) => {
    //   state.stateProduit.push(action.payload);
    // })
    //   .addCase(ajouterStructure.fulfilled, (state, action) => {
    //     const exists = state.stateProduit.some(
    //       (s) => s.id === action.payload.data.id
    //     );
    //     if (!exists) {
    //       state.stateProduit = [...state.stateProduit, action.payload.data];
    //     }
    //   })
    //   // Modification
    //   .addCase(modifierStructure.fulfilled, (state, action) => {
    //     const index = state.stateProduit.findIndex(
    //       (s) => s.id === action.payload.data.id
    //     );
    //     if (index !== -1) state.stateProduit[index] = action.payload.data;
    //   })

    //   // Suppression
    //   .addCase(supprimerStructure.fulfilled, (state, action) => {
    //     state.stateProduit = state.stateProduit.filter(
    //       (s) => s.id !== action.payload.data.id
    //     );
    //   });
  },
});
export const { updateQuantite } = produitSlice.actions;
export default produitSlice.reducer;
