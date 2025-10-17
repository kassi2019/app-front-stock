import React, { useRef, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

function Graphe2QteExpirer() {
  const { stateProduitExpire } = useSelector((state) => state.tableauBord);

  const containerRef = useRef();
  const [width, setWidth] = useState(0);

  // Observer pour capter la largeur du conteneur
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Taille du texte adaptée à la largeur
  const fontSize = width < 400 ? 10 : width < 600 ? 12 : 14;
  const chartHeight = Math.max(250, Math.min(400, width * 0.6)); // Hauteur adaptative

  return (
    <div className="card shadow-sm" ref={containerRef}>
      <div className="card-header bg-secondary text-white">
        📉 Variation des quantités par produit
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={stateProduitExpire}
            margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="produit" tick={{ fontSize }} />
            <YAxis tick={{ fontSize }} />
            <Tooltip wrapperStyle={{ fontSize }} />
            <Legend wrapperStyle={{ fontSize }} />
            
            <Bar dataKey="qteInitial" stackId="b" fill="#007bff" />
            <Bar dataKey="qteexpiration" stackId="a" fill="#e78309ff" />
            <Bar dataKey="qtevendue" stackId="a" fill="#0a8d3cff" />
            <Bar dataKey="qtepertes" stackId="a" fill="#131210ff" />
            <Bar dataKey="qteDisponible" stackId="a" fill="#ef0909ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphe2QteExpirer;
