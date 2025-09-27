import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  fetchUserProfile,
  updateUserProfile,
  changeUserPassword,
  uploadProfilePhotoThunk,
  informationUtilisateur
} from "../../Service/login";

// interface LoginState {
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
//   access_token: string | null;
// }
const initialState = {
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
  // 🔄Hydratation depuis localStorage pour les rafraîchissements de page
  access_token: localStorage.getItem("access_token"),
  user: JSON.parse(localStorage.getItem("user")) || null,

  profile: null,
  loading: false,
  success: null,
  stateAllUtilisateur: [],
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.access_token = null;
      state.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    },

    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.access_token = action.payload.access_token;
        localStorage.setItem("access_token", action.payload.access_token);
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (typeof action.payload === "string"
            ? action.payload
            : action.error.message) || "Erreur inconnue";
      })

      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.access_token = null;
        localStorage.removeItem("access_token");
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Profil mis à jour avec succès";
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = "Mot de passe modifié avec succès";
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    // 📸 Mise à jour photo
      .addCase(uploadProfilePhotoThunk.fulfilled, (state, action) => {
        state.profile = { ...state.profile, photoUrl: action.payload };
      })
    
    .addCase(informationUtilisateur.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(informationUtilisateur.fulfilled, (state, action) => {
            state.loading = false;
            state.stateAllUtilisateur = action.payload.data || action.payload;
    
           
            // Adjust based on your API response structure
          })
          .addCase(informationUtilisateur.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.data;
          })
  },
});
export const { logout } = login.actions;
export default login.reducer;
