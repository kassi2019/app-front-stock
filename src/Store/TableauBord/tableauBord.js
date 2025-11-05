import { createSlice } from "@reduxjs/toolkit";
import {
  afficherQteDisponible,
  AfficherQuantiteEnAttente,
  AfficherQuantiteExpirer,
  AfficherQteRecuParMois,
  AfficherProduitExpirer,
  DetailQuantiteDisponible,
  DetailQuantiteEnAttente,
  DetailQuantiteExpirationBientot,
  DetailQuantiteExpirationAujourdHui,
  DetailQuantiteQuantiteDetruite,
  DetailQuantiteQuantiteNonDetruite,
  AfficherEvolutionVenteParJours,
  AfficherEvolutionVenteParMois,
  AfficherEvolutionVenteParAnnee,
  EvolutionQteParJoursModePaiement,
} from "../../Service/tableauBord.js";

const tableauBordSlice = createSlice({
  name: "tableauBord",
  initialState: {
    stateQteDisponible: [],
    stateQteEnAttente: [],
    stateQteExpire: [],
    stateQteRentrantParMois: [],
    stateProduitExpire: [],

    stateEvaluationVenteParJour: [],
    stateEvaluationVenteParMois: [],
    stateEvaluationVenteParAnnee: [],

    stateDetaiQuantiteDisponible: [],
    stateDetaiQuantiteEnAttente: [],
    stateDetailQuantiteExpirationBientot: [],
    stateDetailQuantiteExpirationAujourdHui: [],
    stateDetailQuantiteQuantiteDetruite: [],
    stateDetailQuantiteQuantiteNonDetruite: [],

    stateEvolutionQteVenduParJoursCaissier: [],
    stateEvolutionMontantVenduParJoursCaissier: [],

    stateEvolutionQteVenduParModePaiement: [],

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
      })

      .addCase(DetailQuantiteDisponible.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DetailQuantiteDisponible.fulfilled, (state, action) => {
        state.loading = false;
        state.stateDetaiQuantiteDisponible =
          action.payload.data || action.payload;
      })
      .addCase(DetailQuantiteDisponible.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(DetailQuantiteEnAttente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DetailQuantiteEnAttente.fulfilled, (state, action) => {
        state.loading = false;
        state.stateDetaiQuantiteEnAttente =
          action.payload.data || action.payload;
      })
      .addCase(DetailQuantiteEnAttente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(DetailQuantiteExpirationBientot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DetailQuantiteExpirationBientot.fulfilled, (state, action) => {
        state.loading = false;
        state.stateDetailQuantiteExpirationBientot =
          action.payload.data || action.payload;
      })
      .addCase(DetailQuantiteExpirationBientot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(DetailQuantiteExpirationAujourdHui.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        DetailQuantiteExpirationAujourdHui.fulfilled,
        (state, action) => {
          state.loading = false;
          state.stateDetailQuantiteExpirationAujourdHui =
            action.payload.data || action.payload;
        }
      )
      .addCase(DetailQuantiteExpirationAujourdHui.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(DetailQuantiteQuantiteDetruite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DetailQuantiteQuantiteDetruite.fulfilled, (state, action) => {
        state.loading = false;
        state.stateDetailQuantiteQuantiteDetruite =
          action.payload.data || action.payload;
      })
      .addCase(DetailQuantiteQuantiteDetruite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(DetailQuantiteQuantiteNonDetruite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DetailQuantiteQuantiteNonDetruite.fulfilled, (state, action) => {
        state.loading = false;
        state.stateDetailQuantiteQuantiteNonDetruite =
          action.payload.data || action.payload;
      })
      .addCase(DetailQuantiteQuantiteNonDetruite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      .addCase(AfficherEvolutionVenteParJours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AfficherEvolutionVenteParJours.fulfilled, (state, action) => {
        state.loading = false;
        state.stateEvaluationVenteParJour =
          action.payload.data || action.payload;
      })
      .addCase(AfficherEvolutionVenteParJours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(AfficherEvolutionVenteParMois.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AfficherEvolutionVenteParMois.fulfilled, (state, action) => {
        state.loading = false;
        state.stateEvaluationVenteParMois =
          action.payload.data || action.payload;
      })
      .addCase(AfficherEvolutionVenteParMois.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(AfficherEvolutionVenteParAnnee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AfficherEvolutionVenteParAnnee.fulfilled, (state, action) => {
        state.loading = false;
        state.stateEvaluationVenteParAnnee =
          action.payload.data || action.payload;
      })
      .addCase(AfficherEvolutionVenteParAnnee.rejected, (state, action) => {
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

export default tableauBordSlice.reducer;
