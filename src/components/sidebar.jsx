import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuGestionStock from "./dossierMenu/menuGestionStock";
import { useDispatch, useSelector } from "react-redux";
import api from "../Service/axios";
import { informationUtilisateur } from "../Service/login";

function Sidebar() {
  const dispatch = useDispatch();
  const { stateAllUtilisateur } = useSelector((state) => state.login);
  const [profileData, setProfileData] = useState({
    nom_utilisateur: "",
    noms_prenoms: "",
    role_id: "",
    matricule: "",
    libelle_role: "",
  });
  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    dispatch(informationUtilisateur());
  }, [dispatch]);

  // 🔹 Fermer la sidebar au démarrage
  useEffect(() => {
    document.body.classList.add("sidebar-icon-only");
  }, []);

  useEffect(() => {
    if (stateAllUtilisateur) {
      setProfileData({
        noms_prenoms: stateAllUtilisateur.noms_prenoms || "",
        nom_utilisateur: stateAllUtilisateur.nom_utilisateur || "",
        role_id: stateAllUtilisateur?.role?.id || "",
        matricule: stateAllUtilisateur.matricule || "",
        libelle_role: stateAllUtilisateur?.role?.libelle || "",
      });
      setPhotoPreview(
        stateAllUtilisateur.photoUrl
          ? `${api.defaults.baseURL}${stateAllUtilisateur.photoUrl}`
          : "https://via.placeholder.com/150"
      );
    }
  }, [stateAllUtilisateur]);

  // const photoSrc = stateAllUtilisateur?.photoUrl
  //   ? `${api.defaults.baseURL}${stateAllUtilisateur.photoUrl}`
  //   : "https://via.placeholder.com/45";

  const { module } = useParams();

  return (
    <div>
      <nav
        className="sidebar sidebar-offcanvas"
        id="sidebar"
        style={{
          height: "800vh", // 🔹 hauteur = toute la fenêtre
          // 🔹 reste au-dessus du contenu
        }}
      >
        <ul className="nav">
          <li className="nav-item">
            <div className="d-flex sidebar-profile">
              <div className="sidebar-profile-image">
                <img
                  src={photoPreview || null}
                  alt="image"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="sidebar-profile-name">
                <p
                  className="sidebar-name"
                  style={{ textTransform: "capitalize" }}
                >
                  {profileData?.noms_prenoms}
                </p>
                <p
                  className="sidebar-name"
                  style={{ fontSize: "12px", textAlign: "center" }}
                >
                  {profileData?.libelle_role}
                </p>
              </div>
            </div>
          </li>
          {(module === "1" || module === "0") && <MenuGestionStock />}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
