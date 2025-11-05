import { createSlice } from "@reduxjs/toolkit";
import {
  afficherResultatPan,
  evolutionParJoursCaissier,
  EvolutionQteParJoursModePaiement,
} from "../../Service/tableauBord.js";

const TableauBordCaissierSlice = createSlice({
  name: "tableauBord",
  initialState: {
    stateAffichePanCaissier: [],
    stateEvolutionVenduParJoursCaissier: [],
     stateEvolutionQteVenduParModePaiement: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(afficherResultatPan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(afficherResultatPan.fulfilled, (state, action) => {
        state.loading = false;

        state.stateAffichePanCaissier = action.payload.data || action.payload;
        ///console.log("test",state.stateAffichePanCaissier);
      })
      .addCase(afficherResultatPan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(evolutionParJoursCaissier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(evolutionParJoursCaissier.fulfilled, (state, action) => {
        state.loading = false;
        state.stateEvolutionVenduParJoursCaissier =
          action.payload.data || action.payload;
      })
      .addCase(evolutionParJoursCaissier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
    
    .addCase(EvolutionQteParJoursModePaiement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EvolutionQteParJoursModePaiement.fulfilled, (state, action) => {
        state.loading = false;
        state.stateEvolutionQteVenduParModePaiement =
          action.payload.data || action.payload;
      })
      .addCase(EvolutionQteParJoursModePaiement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      });
  },
});

export default TableauBordCaissierSlice.reducer;
