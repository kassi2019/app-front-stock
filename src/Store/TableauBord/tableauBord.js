import { createSlice } from "@reduxjs/toolkit";
import {
  afficherQteDisponible,
  AfficherQuantiteEnAttente,
  AfficherQuantiteExpirer,
  AfficherQteRecuParMois,
  AfficherProduitExpirer
} from "../../Service/tableauBord.js";

const tableauBordSlice = createSlice({
  name: "tableauBord",
  initialState: {
    stateQteDisponible: [],
    stateQteEnAttente: [],
    stateQteExpire: [],
    stateQteRentrantParMois: [],
    stateProduitExpire: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(afficherQteDisponible.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(afficherQteDisponible.fulfilled, (state, action) => {
        state.loading = false;
        state.stateQteDisponible = action.payload.data || action.payload;
      })
      .addCase(afficherQteDisponible.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(AfficherQuantiteEnAttente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AfficherQuantiteEnAttente.fulfilled, (state, action) => {
        state.loading = false;
        state.stateQteEnAttente = action.payload.data || action.payload;
      })
      .addCase(AfficherQuantiteEnAttente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(AfficherQuantiteExpirer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AfficherQuantiteExpirer.fulfilled, (state, action) => {
        state.loading = false;
        state.stateQteExpire = action.payload.data || action.payload;
      })
      .addCase(AfficherQuantiteExpirer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
    
     .addCase(AfficherQteRecuParMois.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AfficherQteRecuParMois.fulfilled, (state, action) => {
        state.loading = false;
        state.stateQteRentrantParMois = action.payload.data || action.payload;
      })
      .addCase(AfficherQteRecuParMois.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
    
    .addCase(AfficherProduitExpirer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AfficherProduitExpirer.fulfilled, (state, action) => {
        state.loading = false;
        state.stateProduitExpire = action.payload.data || action.payload;
      })
      .addCase(AfficherProduitExpirer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      });
  },
});

export default tableauBordSlice.reducer;
