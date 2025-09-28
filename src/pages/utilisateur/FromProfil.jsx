import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../Service/axios.js";
import {
  uploadProfilePhotoThunk,
  informationUtilisateur,
  updateUserProfile,
  changeUserPassword,
  logoutThunk,
} from "../../Service/login.js";
import {
  messageSucces,
  messageErreur,
} from "../../globalComponents/Notification.js";
//import { useParams } from "react-router-dom";

const FromProfil = () => {
    
    //console.log("Module from FromProfil:", module);
  const dispatch = useDispatch();
  const { stateAllUtilisateur } = useSelector((state) => state.login);

  const [profileData, setProfileData] = useState({
    nom_utilisateur: "",
    noms_prenoms: "",
    role_id: "",
    matricule: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  // Charger profil au montage
  // useEffect(() => {
  //   dispatch(getUserProfile());
  // }, [dispatch]);

  // Charger les infos utilisateur au montage
  useEffect(() => {
    dispatch(informationUtilisateur());
  }, [dispatch]);
  // Mettre à jour les champs quand profile change
  useEffect(() => {
    if (stateAllUtilisateur) {
      setProfileData({
        noms_prenoms: stateAllUtilisateur.noms_prenoms || "",
        nom_utilisateur: stateAllUtilisateur.nom_utilisateur || "",
        role_id: stateAllUtilisateur?.role?.id || "",
        matricule: stateAllUtilisateur.matricule || "",
      });
      setPhotoPreview(
        stateAllUtilisateur.photoUrl
          ? `${api.defaults.baseURL}${stateAllUtilisateur.photoUrl}`
          : "https://via.placeholder.com/150"
      );
    }
  }, [stateAllUtilisateur]);

  const photoSrc = stateAllUtilisateur?.photoUrl
    ? `${api.defaults.baseURL}${stateAllUtilisateur.photoUrl}`
    : "https://via.placeholder.com/45"; // image par défaut si pas de photo

  // Upload photo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handlePhotoUpload = async () => {
    if (!photo) {
      messageErreur("Veuillez sélectionner une photo");
      return;
    }

    try {
      await dispatch(uploadProfilePhotoThunk(photo)).unwrap();
      dispatch(informationUtilisateur());
      messageSucces("Photo de profil mise à jour avec succès");
    } catch (error) {
      messageErreur(
        "Une erreur est survenue lors du changement de photo",
        error
      );
    }
  };

  // Submit infos utilisateur
  // const handleProfileSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(updateUserProfile(profileData));
  // };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    // Vérification si les champs sont remplis
    if (!profileData.noms_prenoms || !profileData.nom_utilisateur || !profileData.matricule) {
      messageErreur("Veuillez remplir tous les champs du profil");
      return;
    }

    try {
      await dispatch(updateUserProfile(profileData)).unwrap();
      messageSucces("Profil mis à jour avec succès");
      dispatch(informationUtilisateur()); // recharge les infos utilisateur
    } catch (error) {
      messageErreur(
        "Une erreur est survenue lors de la mise à jour du profil",
        error
      );
    }
  };

  // Submit mot de passe
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      messageErreur("Veuillez remplir tous les champs");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      messageErreur("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    try {
      // On suppose que `changeUserPassword` est un thunk qui retourne la réponse du backend
      const response = await dispatch(
        changeUserPassword(passwordData)
      ).unwrap();

      // Ici, le backend retourne { message: "Mot de passe modifié avec succès" }
      messageSucces(response.message);
      dispatch(logoutThunk());
      // Réinitialise le formulaire
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      // Pour afficher le message envoyé par NestJS
      const errorMsg = error?.response?.message || "Une erreur est survenue";
      messageErreur(errorMsg);
    }
  };
  console.log("stateAllUtilisateur", profileData);

  return (
    <>
      <h2
        className="mb-4 text-center"
        style={{ fontWeight: "bold", fontSize: "24px" }}
      >
        Mon Profil
      </h2>

      <div className="d-flex gap-3">
        {/* Colonne 1 : Image de profil */}
        <div
          className="p-3 border rounded d-flex flex-column align-items-center"
          style={{ flex: 1, minWidth: "220px" }}
        >
          <h6 className="text-center mb-3">Changer photo de profil</h6>

          {stateAllUtilisateur?.photoUrl === null ? (
            <img
              src={photoPreview}
              alt="Profil"
              className="rounded-circle border"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          ) : (
            <img
              src={photoSrc}
              alt="Profil"
              className="rounded-circle border"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          )}
          <input
            type="file"
            className="form-control mt-3"
            onChange={handlePhotoChange}
          />
          <button
            type="button"
            className="btn btn-primary mt-3 w-100"
            onClick={handlePhotoUpload}
          >
            Changer la photo
          </button>
        </div>

        {/* Colonne 2 : Infos utilisateur */}
        <div className="p-3 border rounded" style={{ flex: 2 }}>
          <h6 className="text-center mb-3">Information sur l'utilisateur</h6>
          <form onSubmit={handleProfileSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Nom et prénoms
                <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={profileData.noms_prenoms}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    noms_prenoms: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Nom Utilisateur
                <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={profileData.nom_utilisateur}
                onChange={(e) =>
                  setProfileData({ ...profileData, nom_utilisateur: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Rôle</label>
              <input
                type="text"
                className="form-control"
                value={stateAllUtilisateur?.role?.libelle}
                readOnly
                onChange={(e) =>
                  setProfileData({ ...profileData, role_id: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Matricule
                <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={profileData.matricule}
                onChange={(e) =>
                  setProfileData({ ...profileData, matricule: e.target.value })
                }
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success">
                Enregistrer
              </button>
            </div>
          </form>
        </div>

        {/* Colonne 3 : Mot de passe */}
        <div
          className="p-3 border rounded d-flex flex-column"
          style={{ flex: 1, minWidth: "250px" }}
        >
          <h6 className="text-center mb-3">Changer le mot de passe</h6>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Ancien mot de passe
                <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
              </label>
              <input
                type="password"
                className="form-control"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Nouveau mot de passe
                <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
              </label>
              <input
                type="password"
                className="form-control"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Confirmer mot de passe{" "}
                <span style={{ fontWeight: "bold", color: "red" }}>(*)</span>
              </label>
              <input
                type="password"
                className="form-control"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-auto d-flex justify-content-end">
              {/* <button type="button" className="btn btn-danger me-2">
                Annuler
              </button> */}
              <button type="submit" className="btn btn-success">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FromProfil;
