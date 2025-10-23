import React from "react";
import TbResponsableStock from "./TbRespoStock/TbResponsableStock";
import TbMagasinier from "../../pages/Produit/produit";
import TbCaissier from "./TbCaissier/TbCaissier";
import { useSelector } from "react-redux";
function PageTableauBord() {
  const { stateAllUtilisateur } = useSelector((state) => state.login);

  return (
    <div>
      {(stateAllUtilisateur?.role?.id === 4 ||
        stateAllUtilisateur?.role?.id === 1) && <TbResponsableStock />}
      {(stateAllUtilisateur?.role?.id === 3 ||
        stateAllUtilisateur?.role?.id === 1) && <TbMagasinier />}
      {(stateAllUtilisateur?.role?.id === 2 ||
        stateAllUtilisateur?.role?.id === 1) && <TbCaissier />}
    </div>
  );
}

export default PageTableauBord;
