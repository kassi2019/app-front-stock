import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { listeProduit, listeProduitProvisoire } from "./produit"; // ton action redux
// import {
//   AfficherQuantiteEnAttente,
//   AfficherQuantiteExpirer,
//   afficherQteDisponible,
// } from "./tableauBord";
export const useSocketProduit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const socket = io(baseURL); // URL de ton backend

    socket.on("connect", () => {
      console.log("✅ Connecté au WebSocket");
    });

    socket.on("produitUpdated", (produit) => {
      console.log("Produit mis à jour:", produit);
      dispatch(listeProduit());
    });
    socket.on("produitstockUpdated", (produitstock) => {
      console.log("Produit mis à jour:", produitstock);
      dispatch(listeProduitProvisoire());
    });

    // socket.on("majTableauBord", (data) => {
    //   console.log("📡 Mise à jour reçue :", data);
    // });

    // socket.on("produitUpdated", (produit) => {
    //   console.log("Produit mis à jour:", produit);
    //   dispatch(listeProduit());
    // });
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};
