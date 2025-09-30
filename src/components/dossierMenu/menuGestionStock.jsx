import React, { useState } from "react";
import { Link } from "react-router-dom";

function MenuGestionStock() {
  // États pour chaque menu (true = ouvert, false = fermé)
  const [openMenu, setOpenMenu] = useState({
    parametre: false,
    magasinier: false,
    caissier: false,
    responsable: false,
    icons: false,
    user: false,
    error: false,
  });

  // Fonction pour basculer un menu
  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div>
      <li className="nav-item">
        <a className="nav-link" href="index.html">
          <i className="typcn typcn-device-desktop menu-icon"></i>
          <span className="menu-title">
            Dashboard <span className="badge badge-primary ml-3">New</span>
          </span>
        </a>
      </li>

      {/* Paramètre */}
      <li className="nav-item">
        <a
          className="nav-link"
          onClick={() => toggleMenu("parametre")}
          aria-expanded={openMenu.parametre}
        >
          <i className="typcn typcn-briefcase menu-icon"></i>
          <span className="menu-title">Paramètre</span>
          <i className="typcn typcn-chevron-right menu-arrow"></i>
        </a>
        <div className={`collapse ${openMenu.parametre ? "show" : ""}`}>
          <ul className="nav flex-column sub-menu">
            <li className="nav-item">
              <a className="nav-link" style={{ fontWeight: "bold" }}>
                Fournisseur
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{ fontWeight: "bold" }}>
                Utilisateur
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Typography</a>
            </li>
          </ul>
        </div>
      </li>

      {/* Menu Magasinier */}
      <li className="nav-item">
        <a
          className="nav-link"
          onClick={() => toggleMenu("magasinier")}
          aria-expanded={openMenu.magasinier}
        >
          <i className="typcn typcn-film menu-icon"></i>
          <span className="menu-title">Menu Magasinier</span>
          <i className="menu-arrow"></i>
        </a>
        <div className={`collapse ${openMenu.magasinier ? "show" : ""}`}>
          <ul className="nav flex-column sub-menu">
            <li className="nav-item">
              <Link
                to={`/produit/${1}`}
                className="nav-link"
                style={{ fontWeight: "bold" }}
              >
                Entrées de Stock
              </Link>
            </li>
          </ul>
        </div>
      </li>

      {/* Menu Caissier */}
      <li className="nav-item">
        <a
          className="nav-link"
          onClick={() => toggleMenu("caissier")}
          aria-expanded={openMenu.caissier}
        >
          <i className="typcn typcn-chart-pie-outline menu-icon"></i>
          <span className="menu-title">Menu Caissier</span>
          <i className="menu-arrow"></i>
        </a>
        <div className={`collapse ${openMenu.caissier ? "show" : ""}`}>
          <ul className="nav flex-column sub-menu">
            <li className="nav-item">
              <Link
                to={`/listeProduitProvisoire/${1}`}
                className="nav-link"
                style={{ fontWeight: "bold" }}
              >
                Sorties de Stock
              </Link>
            </li>
          </ul>
        </div>
      </li>

      {/* Menu Responsable */}
      <li className="nav-item">
        <a
          className="nav-link"
          onClick={() => toggleMenu("responsable")}
          aria-expanded={openMenu.responsable}
        >
          <i className="typcn typcn-compass menu-icon "></i>
          <span className="menu-title">Menu Responsable</span>
          <i className="menu-arrow"></i>
        </a>
        <div className={`collapse ${openMenu.responsable ? "show" : ""}`}>
          <ul className="nav flex-column sub-menu">
            <li className="nav-item">
              <Link
                to={`/controleInventaire/${1}`}
                className="nav-link"
                style={{ fontWeight: "bold" }}
              >
                Inventaire
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/inventaireValide/${1}`}
                className="nav-link"
                style={{ fontWeight: "bold" }}
              >
                Inventaire Validé
              </Link>
            </li>
            

          </ul>
        </div>
      </li>

      {/* ... tu continues le même principe pour "icons", "user", "error" ... */}

      <li className="nav-item">
        <a className="nav-link" href="pages/documentation/documentation.html">
          <i className="typcn typcn-document-text menu-icon"></i>
          <span className="menu-title">Documentation</span>
        </a>
      </li>
    </div>
  );
}

export default MenuGestionStock;
