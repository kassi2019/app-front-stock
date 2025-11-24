import { createSlice } from "@reduxjs/toolkit";
import {
  listeProduit,
  listeProduitProvisoire,
  listeProduitInventaire,
  listeProduitValide,
  nombreLotProduitParId,
  quantiteActuelProduitParId,
  updateLotsGlobal,
  //afficherInformationLotParProduit,
  //   ajouterStructure,
  //   modifierStructure,
  //   supprimerStructure,
} from "../../Service/produit";
import { messageErreur, messageSucces } from "../../globalComponents/Notification";

const produitSlice = createSlice({
  name: "structures",
  initialState: {
    stateProduit: [],
    stateProduitProvisoire: [],
    stateProduitInventaire: [],
    stateNombreLotProduit: [],
    stateQuantiteActuelProduit: [],
    stateProduitValide: [],
    stateProduitLot: [],
    optionsSelect: [],
    optionsSelectProduit:[],
    loading: false,
    error: null,
    ventes: [],
    derniereVente: null,
  },
  reducers: {
    updateQuantite: (state, action) => {
      const { id, quantite } = action.payload;
      const produit = state.stateProduitProvisoire.find((p) => p.id === id);
      if (produit) {
        produit.quantite = quantite; // ✅ met bien à jour uniquement ce produit
      }
    },

    updateQuantiteTheorie: (state, action) => {
      const { id, quantite_theorique } = action.payload;
      const produit = state.stateProduitInventaire.find((p) => p.id === id);
      if (produit) {
        produit.quantite_theorique = quantite_theorique; // ✅ met bien à jour uniquement ce produit
      }
    },

    addVente: (state, action) => {
      state.ventes.push(action.payload);
      state.derniereVente = action.payload; // utile pour le reçu
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
        state.optionsSelectProduit = action.payload.data.map((item) => ({
          value: item.id, // ou item.niveau
          label: item.code + " - " + item.libelle + " ( " + item.unitaire + " )",
          code:item.code
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
      })

      .addCase(listeProduitInventaire.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listeProduitInventaire.fulfilled, (state, action) => {
        state.loading = false;
        state.stateProduitInventaire = action.payload.map((p) => ({
          ...p,
          quantite: p.quantite ?? 0, // ✅ toujours un nombre
        }));
      })

      .addCase(listeProduitInventaire.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(listeProduitValide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listeProduitValide.fulfilled, (state, action) => {
        state.loading = false;
        state.stateProduitValide = action.payload.map((p) => ({
          ...p,
          quantite: p.quantite ?? 0, // ✅ toujours un nombre
        }));
      })

      .addCase(listeProduitValide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(nombreLotProduitParId.pending, (state) => {
        state.loading = true;
      })
      .addCase(nombreLotProduitParId.fulfilled, (state, action) => {
        state.loading = false;
        state.stateNombreLotProduit = action.payload; // ✅ stocker la réponse
      })
      .addCase(nombreLotProduitParId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(quantiteActuelProduitParId.pending, (state) => {
        state.loading = true;
      })
      .addCase(quantiteActuelProduitParId.fulfilled, (state, action) => {
        state.loading = false;
        state.stateQuantiteActuelProduit = action.payload; // ✅ stocker la réponse
      })
      .addCase(quantiteActuelProduitParId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateLotsGlobal.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateLotsGlobal.fulfilled, (state) => {
        state.loading = false;
        //state.stateProduitInventaire = [];
        messageSucces("Opération effectuée avec succès ✅");
        state.success = true;
      })
      .addCase(updateLotsGlobal.rejected, (state, action) => {
        state.loading = false;
        messageErreur("Erreur d'enregistrement ❌");
        state.error = action.payload;
      });
    // .addCase(afficherInformationLotParProduit.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(afficherInformationLotParProduit.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.stateProduitLot = action.payload.data || action.payload;
    // })
    // .addCase(afficherInformationLotParProduit.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.data;
    // });
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
export const { updateQuantiteTheorie } = produitSlice.actions;
export default produitSlice.reducer;
