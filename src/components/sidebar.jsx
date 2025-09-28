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
  const photoSrc = stateAllUtilisateur?.photoUrl
    ? `${api.defaults.baseURL}${stateAllUtilisateur.photoUrl}`
    : "https://via.placeholder.com/45"; // image par défaut si pas de photo

  const { module } = useParams();
  // console.log("Module from Sidebar:", module);
  // const location = useLocation();
  // const { data } = location.state || {};

  return (
    <div>
      {/* <div className="theme-setting-wrapper">
        <div id="settings-trigger">
          <i className="typcn typcn-cog-outline"></i>
        </div>
        <div id="theme-settings" className="settings-panel">
          <i className="settings-close typcn typcn-delete-outline"></i>
          <p className="settings-heading">SIDEBAR SKINS</p>
          <div className="sidebar-bg-options" id="sidebar-light-theme">
            <div className="img-ss rounded-circle bg-light border mr-3"></div>
            Light
          </div>
          <div className="sidebar-bg-options selected" id="sidebar-dark-theme">
            <div className="img-ss rounded-circle bg-dark border mr-3"></div>
            Dark
          </div>
          <p className="settings-heading mt-2">HEADER SKINS</p>
          <div className="color-tiles mx-0 px-4">
            <div className="tiles success"></div>
            <div className="tiles warning"></div>
            <div className="tiles danger"></div>
            <div className="tiles primary"></div>
            <div className="tiles info"></div>
            <div className="tiles dark"></div>
            <div className="tiles default border"></div>
          </div>
        </div>
      </div> */}
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <div className="d-flex sidebar-profile">
              <div className="sidebar-profile-image">
                {/* <img src="images/faces/face29.png" alt="image" /> */}
                {stateAllUtilisateur?.photoUrl === null ? (
                  <img
                    src={photoPreview}
                    alt="image"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src={photoSrc}
                    alt="image"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
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
            {/* <p className="sidebar-menu-title">Dash menu</p> */}
          </li>
          {/* <MenuGestionStock /> */}
          {(module === "1" || module === "0") && <MenuGestionStock />}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
