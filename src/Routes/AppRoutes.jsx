import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/login";
// import Milieu from "../components/milieu";
import PrivateRoute from "./PrivateRoute";
import Parent from "../components/parent";
import AccueilPrincipal from "../components/AccueilPrincipal";
// import Structure from "../pages/Structure/Structure";
import TableauBord from "../components/tableauBord";
import Produit from "../pages/Produit/produit";
import TbModuleStock from "../components/dossierTableauBord/TbModuleStock";
import ListeProduitProvisoire from "../pages/dossierCaissier/listeProduitProvisoire";
// import Principal from "../components/principal";
// import PrincipalPlan from "../pages/PlanStructure/PrincipalPlan";
// import Role from "../pages/gestionUtilisateur/role/role";
// import FormProfil from "../pages/gestionUtilisateur/utilisateur/FormProfil";
// import Utilisateur from "../pages/gestionUtilisateur/utilisateur/utilisateur";
// import AffectationSite from "../pages/gestionParametre/AffectationDesSites/PrincipalAffectationSite";
// import TypeEquipement from "../pages/gestionParametre/TypeEquipement/TypeEquipement";
// import Equipement from "../pages/gestionParametre/Equipement/Equipement";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirection par défaut vers /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Page de connexion */}
      <Route path="/login" element={<Login />} />
      <Route path="/accueil2" element={<AccueilPrincipal />} />
      {/* Routes protégées */}
      <Route element={<PrivateRoute />}>
        <Route element={<Parent />}>
          {/* <Route path="accueil" element={<Milieu />} /> */}
          <Route path="tableauBord" element={<TableauBord />} />
          <Route path="/produit" element={<Produit />} />
          <Route path="TbModuleStock/:module" element={<TbModuleStock />} />
          <Route
            path="listeProduitProvisoire"
            element={<ListeProduitProvisoire />}
          />
          {/* <Route path="structure" element={<Structure />} />
          <Route path="planStructure" element={<PrincipalPlan />} />
          <Route path="role" element={<Role />} />
          <Route path="profil" element={<FormProfil />} />
          <Route path="utilisateur" element={<Utilisateur />} />
          <Route path="affectationSite" element={<AffectationSite />} />
          <Route path="typeEquipement" element={<TypeEquipement />} />
          <Route path="equipement" element={<Equipement />} /> */}
        </Route>
      </Route>

      {/* Redirection pour toute URL inconnue */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
