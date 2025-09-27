import React from "react";
import "./Accueil.css"; // <-- fichier CSS
function headerMini() {
  return (
    <div className="header">
      <h1 className="headerTitle"></h1>
      <button className="logoutBtn">{/* <FiLogOut size={24} /> */}</button>
    </div>
  );
}

export default headerMini;
