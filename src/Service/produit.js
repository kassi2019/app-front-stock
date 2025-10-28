import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";

export const listeProduit = createAsyncThunk(
  "produit/produits",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/produit/liste"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération des produit"
      );
    }
  }
);

export const rechercheCodeBarre = createAsyncThunk(
  "code/codeBarre",
  async (code_barre, thunkAPI) => {
    try {
      const res = await api.get(`/produit/${code_barre}`);
      return res.data.data; // on ne garde que le tableau des utilisateurs
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data ||
          "Erreur lors de l'affichage des utilisateurs par niveau structure"
      );
    }
  }
);

export const ajouterProduit = createAsyncThunk(
  "produit/add",
  async (nouvelleTypeEquipement, thunkAPI) => {
    try {
      const res = await api.post("/produit/creer", nouvelleTypeEquipement);
      thunkAPI.dispatch(listeProduit());
      return res.data; // Retourne la structure ajoutée
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de l'ajout de type Equipement"
      );
    }
  }
);

export const supprimerProduit = createAsyncThunk(
  "deleteproduit/deleteproduit",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/produit/supprimer/${id}`);
      thunkAPI.dispatch(listeProduit());
      return res.data; // On retourne l'ID supprimé pour le retirer du store
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la suppression du produit"
      );
    }
  }
);

// export const afficherInformationLotParProduit = createAsyncThunk(
//   "informationLot/idProduit",
//   async (idProduit, thunkAPI) => {
//     try {
//       const res = await api.get(`/produit/informationProduit/${idProduit}`);
//       return res.data; // on ne garde que le tableau des utilisateurs
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data ||
//           "Erreur lors de l'affichage des produit"
//       );
//     }
//   }
// );
// export const afficherInformationLotParProduit = createAsyncThunk(

//   "LotParProduit/LotParProduit",
//   async ({ idProduit }, thunkAPI) => {
//     console.log({idProduit});
//     try {
//       const res = await api.get(
//         `/produit/informationProduit/${idProduit}`
//       );
//       return res.data;
//     } catch (error) {
//       console.error("Erreur API lots :", error);
//       return thunkAPI.rejectWithValue(error.response?.data || "Erreur serveur");
//     }
//   }
// );
export const afficherInformationLotParProduit = async (idProduit) => {
  try {
    const res = await api.get(`/produit/informationProduit/${idProduit}`);
    return res.data; // tableau de lots
  } catch (error) {
    console.error("Erreur API lots :", error);
    return [];
  }
};

export const afficherSommeQuantiteParProduit = async (idProduit) => {
  try {
    const res = await api.get(`/produit/sommeQuantite/${idProduit}`);
    return res.data; // tableau de lots
  } catch (error) {
    console.error("Erreur API lots :", error);
    return 0;
  }
};

export const afficherSommePrixAchatParProduit = async (idProduit) => {
  try {
    const res = await api.get(`/produit/sommePrixAchat/${idProduit}`);
    return res.data; // tableau de lots
  } catch (error) {
    console.error("Erreur API lots :", error);
    return 0;
  }
};

export const modifierLotProduit = createAsyncThunk(
  "LotProduit/LotProduit",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/produit/modifier/lotProduit/${id}`, data);
      // thunkAPI.dispatch(afficherInformationLotParProduit(data?.idProduit));
      return res.data; // Retourne la structure modifiée
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la modification du lot"
      );
    }
  }
);

export const listeProduitProvisoire = createAsyncThunk(
  "produitProvisoire/produitsProvisoire",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/produit/listeProduitEnSortie"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération des produit"
      );
    }
  }
);

export const listeProduitInventaire = createAsyncThunk(
  "inventaire/inventaire",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/produit/listeProduitInventaire"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération des produit"
      );
    }
  }
);
export const listeProduitValide = createAsyncThunk(
  "inventaireValide/inventaireValide",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/produit/listeProduitInventaireValide"); // <-- adapte cette route à ton backend

      return res.data; // On suppose que res.data contient la liste des structures
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la récupération des produit"
      );
    }
  }
);

// export const mettreAJourQuantiteTheorique = createAsyncThunk(
//   "Theorique/Theorique",

//   async ({ id, data }, thunkAPI) => {

//      console.log("res.data", data);
//     try {
//       const res = await api.put(`/produit/mettreAJourQuantiteTheorique/${id}`, data);

//       // thunkAPI.dispatch(afficherInformationLotParProduit(data?.idProduit));
//       return res.data; // Retourne la structure modifiée
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data || "Erreur lors de la modification du lot"
//       );
//     }
//   }
// );

export const mettreAJourQuantiteTheorique = createAsyncThunk(
  "produit/mettreAJourQuantiteTheorique",
  async ({ idlot, quantiteLot }, thunkAPI) => {
    try {
      const res = await api.get(
        `/produit/miseAjourQuantite/${idlot}/${quantiteLot}`
      );

      // recharger la liste des produits après mise à jour

      return res.data;
    } catch (error) {
      console.error("Erreur API lots :", error);
      return thunkAPI.rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

export const RamenerQuantiteTheorique = createAsyncThunk(
  "produitramener/produitramener",
  async ({ idlot }, thunkAPI) => {
    try {
      const res = await api.get(`/produit/ramenerQuantite/${idlot}`);

      // recharger la liste des produits après mise à jour

      return res.data;
    } catch (error) {
      console.error("Erreur API lots :", error);
      return thunkAPI.rejectWithValue(error.response?.data || "Erreur serveur");
    }
  }
);

// export const nombreLotProduitParId = createAsyncThunk(
//   "nombreL/nombreL",
//   async ({ idprod }, thunkAPI) => {
//     console.log({ idprod });
//     try {
//       const res = await api.get(`/produit/nombreLotProduitid/${idprod}`);

//       // recharger la liste des produits après mise à jour

//       return res.data;
//     } catch (error) {
//       console.error("Erreur API lots :", error);
//       return thunkAPI.rejectWithValue(error.response?.data || "Erreur serveur");
//     }
//   }
// );
export const nombreLotProduitParId = createAsyncThunk(
  "nombreLot/nombreLot",
  async (idProduit, thunkAPI) => {
    try {
      const res = await api.get(`/produit/nombreLotProduitid/${idProduit}`);
      //   alert(res);
      return res.data; // on ne garde que le tableau des utilisateurs
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de l'affichage"
      );
    }
  }
);

export const quantiteActuelProduitParId = createAsyncThunk(
  "quantiteActuellot/quantiteActuellot",
  async (idProduit, thunkAPI) => {
    try {
      const res = await api.get(`/produit/quantiteProduitid/${idProduit}`);
      //   alert(res);
      return res.data; // on ne garde que le tableau des utilisateurs
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de l'affichage"
      );
    }
  }
);

export const ajouterLotProduit = createAsyncThunk(
  "lotProduit/ajouterlotProduit",

  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/produit/creerLotProduit", payload);

      // thunkAPI.dispatch(fournisseurParCategorie());
      return res.data; // Données renvoyées par ton controller NestJS
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de l'ajout de la categorie"
      );
    }
  }
);

export const supprimerLotProduit = createAsyncThunk(
  "deleteproduitlot/deleteproduitlot",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/produit/supprimerLotProduit/${id}`);
      // thunkAPI.dispatch(afficherInformationLotParProduit(id1));
      return res.data; // On retourne l'ID supprimé pour le retirer du store
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la suppression du produit"
      );
    }
  }
);



export const ajouterProduitTemporellement = createAsyncThunk(
  "temporel/temporel",
  async ({codeProduit}, thunkAPI) => {
    try {
      // tu peux utiliser GET ou POST selon ton API
      const res = await api.post(
        `/produit/ajouterProduitTemporelParCode/${codeProduit}`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de l'enregistrement du produit"
      );
    }
  }
);


export const detailProduitParCode = createAsyncThunk(
  "codeProduit/codeProduit",
  async (codeprod, thunkAPI) => {
    try {
      const res = await api.get(`/produit/detailProduitParCode/${codeprod}`);
      //   alert(res);
      return res.data; // on ne garde que le tableau des utilisateurs
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data ||
          "Erreur lors de l'affichage"
      );
    }
  }
);


export const supprimerProduitTemporel = createAsyncThunk(
  "deleteproduitTemporel/deleteproduitTemporel",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/produit/supprimerProduitTemporel/${id}`);

      return res.data; // On retourne l'ID supprimé pour le retirer du store
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de la suppression du produit"
      );
    }
  }
);