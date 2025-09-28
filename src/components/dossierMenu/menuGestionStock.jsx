import React from "react";
//import { Link, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function MenuGestionStock() {
  //const { module } = useParams();

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
      <li className="nav-item">
        <a
          className="nav-link"
          data-toggle="collapse"
          href="#ui-basic"
          aria-expanded="false"
          aria-controls="ui-basic"
        >
          <i className="typcn typcn-briefcase menu-icon"></i>
          <span className="menu-title">Paramétre</span>
          <i className="typcn typcn-chevron-right menu-arrow"></i>
        </a>
        <div className="collapse" id="ui-basic">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item">
              <a
                className="nav-link"
                href="pages/ui-features/buttons.html"
                style={{ fontWeight: "bold" }}
              >
                Fournisseur
              </a>
            </li>
            <li className="nav-item">
              {" "}
              <a
                className="nav-link"
                href="pages/ui-features/dropdowns.html"
                style={{ fontWeight: "bold" }}
              >
                Utilisateur
              </a>
            </li>
            <li className="nav-item">
              {" "}
              <a className="nav-link" href="pages/ui-features/typography.html">
                Typography
              </a>
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          data-toggle="collapse"
          href="#form-elements"
          aria-expanded="false"
          aria-controls="form-elements"
        >
          <i className="typcn typcn-film menu-icon"></i>
          <span className="menu-title">Menu Magasinier</span>
          <i className="menu-arrow"></i>
        </a>
        <div className="collapse" id="form-elements">
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
      <li className="nav-item">
        <a
          className="nav-link"
          data-toggle="collapse"
          href="#charts"
          aria-expanded="false"
          aria-controls="charts"
        >
          <i className="typcn typcn-chart-pie-outline menu-icon"></i>
          <span className="menu-title">Menu Caissier</span>
          <i className="menu-arrow"></i>
        </a>
        <div className="collapse" id="charts">
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
      <li className="nav-item">
        <a
          className="nav-link"
          data-toggle="collapse"
          href="#tables"
          aria-expanded="false"
          aria-controls="tables"
        >
          <i className="typcn typcn-th-small-outline menu-icon"></i>
          <span className="menu-title">Menu Responsable</span>
          <i className="menu-arrow"></i>
        </a>
        <div className="collapse" id="tables">
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
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          data-toggle="collapse"
          href="#icons"
          aria-expanded="false"
          aria-controls="icons"
        >
          <i className="typcn typcn-compass menu-icon"></i>
          <span className="menu-title">Icons</span>
          <i className="menu-arrow"></i>
        </a>
        <div className="collapse" id="icons">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item">
              {" "}
              <a className="nav-link" href="pages/icons/mdi.html">
                Mdi icons
              </a>
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          data-toggle="collapse"
          href="#auth"
          aria-expanded="false"
          aria-controls="auth"
        >
          <i className="typcn typcn-user-add-outline menu-icon"></i>
          <span className="menu-title">User Pages</span>
          <i className="menu-arrow"></i>
        </a>
        <div className="collapse" id="auth">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item">
              {" "}
              <a className="nav-link" href="pages/samples/login.html">
                {" "}
                Login{" "}
              </a>
            </li>
            <li className="nav-item">
              {" "}
              <a className="nav-link" href="pages/samples/register.html">
                {" "}
                Register{" "}
              </a>
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          data-toggle="collapse"
          href="#error"
          aria-expanded="false"
          aria-controls="error"
        >
          <i className="typcn typcn-globe-outline menu-icon"></i>
          <span className="menu-title">Error pages</span>
          <i className="menu-arrow"></i>
        </a>
        <div className="collapse" id="error">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item">
              {" "}
              <a className="nav-link" href="pages/samples/error-404.html">
                {" "}
                404{" "}
              </a>
            </li>
            <li className="nav-item">
              {" "}
              <a className="nav-link" href="pages/samples/error-500.html">
                {" "}
                500{" "}
              </a>
            </li>
          </ul>
        </div>
      </li>
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
