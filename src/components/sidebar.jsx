import React from "react";
import { Link,useParams  } from "react-router-dom";
import MenuGestionStock from "./dossierMenu/menuGestionStock";

function Sidebar() {
  const { module } = useParams();
  // const location = useLocation();
  // const { data } = location.state || {};
console.log("Data in Sidebar:", module);
  return (
    <div>
      <div className="theme-setting-wrapper">
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
      </div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <div className="d-flex sidebar-profile">
              <div className="sidebar-profile-image">
                <img src="images/faces/face29.png" alt="image" />
                <span className="sidebar-status-indicator"></span>
              </div>
              <div className="sidebar-profile-name">
                <p className="sidebar-name">Kenneth Osborne7</p>
                <p className="sidebar-designation">Welcome</p>
              </div>
            </div>
            {/* <div className="nav-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type to search..."
                  aria-label="search"
                  aria-describedby="search"
                />
                <div className="input-group-append">
                  <span className="input-group-text" id="search">
                    <i className="typcn typcn-zoom"></i>
                  </span>
                </div>
              </div>
            </div> */}
            <p className="sidebar-menu-title">Dash menu</p>
          </li>
          <MenuGestionStock />
          {/* {data?.module === 1 && <MenuGestionStock />} */}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
