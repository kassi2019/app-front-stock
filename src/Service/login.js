import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", credentials);
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Erreur login");
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  return true;
});

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/me"); // Endpoint pour récupérer le profil
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur de chargement du profil"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/users/profile", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur de mise à jour du profil"
      );
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  "user/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/users/password", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur de changement du mot de passe"
      );
    }
  }
);

// 📸 Upload photo
export const uploadProfilePhotoThunk = createAsyncThunk(
  "users/uploadProfilePhoto",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("photo", file);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await api.post("/users/profile-photo", formData, config);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur upload photo"
      );
    }
  }
);

export const informationUtilisateur = createAsyncThunk(
  "informationUtilisateur/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/users/info-user"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des Roles
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data ||
          "Erreur lors de la récupération les informations utilisateur"
      );
    }
  }
);
