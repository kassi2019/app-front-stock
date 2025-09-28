// src/pages/Accueil.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const statCards = [
  {
    number: 120,
    label: "Gestion de parc auto",
    color: "#1E40AF",
    route: "/",
    module:3
  },  
  {
    number: 5,
    label: "Gestion de parc Informatique",
    color: "#10B981",
    route: "/",
    module:2

  },
  // {
  //   number: 30,
  //   label: "Stock Initial",
  //   color: "#F59E0B",
  //   route: "/stock-initial",
  // },
  // {
  //   number: 18,
  //   label: "Stock Actuel",
  //   color: "#EF4444",
  //   route: "/stock-actuel",
  // },
  {
    number: 30,
    label: "Gestion de stock",
    color: "#F59E0B",
    route: "/TbModuleStock",
    module:1
  },
  // {
  //   number: 18,
  //   label: "Produit en Rupture",
  //   color: "#EF4444",
  //   route: "/rupture",
  // },
];

export default function Accueil() {
  const navigate = useNavigate();
  const radius = 250; // distance des cercles au centre
  const centerX = 300;
  const centerY = 280;

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <div
        style={{
          position: "relative",
          width: "400px",
          height: "400px",
        }}
      >
        {/* Élément central (icône dashboard Bootstrap) */}
        <div
          className="rounded-circle d-flex align-items-center justify-content-center shadow"
          style={{
            width: "200px",
            height: "200px",
            background: "#1E293B",
            color: "white",
            fontSize: "50px",
            position: "absolute",
            top: centerY - 75,
            left: centerX - 75,
          }}
        >
          <i className="bi bi-speedometer2">Module</i>
        </div>

        {/* Les bulles autour */}
        {statCards.map((card, index) => {
          const angle = (index / statCards.length) * Math.PI * 2;
          const x = centerX + radius * Math.cos(angle) - 75;
          const y = centerY + radius * Math.sin(angle) - 75;

          return (
            <div
              key={index}
              className="d-flex flex-column align-items-center justify-content-center text-white shadow"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: card.color,
                position: "absolute",
                top: y,
                left: x,
                cursor: "pointer",
                textAlign: "center",
                padding: "15px",
              }}
              onClick={() => navigate(`${card.route}/${card.module}`)} // 👈 Navigation dynamique
            >
              <div className="fw-bold fs-4">{card.number}</div>
              <div
                style={{
                  fontSize: "20px",
                  marginTop: "5px",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                  lineHeight: "1",
                  userSelect: "none",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {card.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
