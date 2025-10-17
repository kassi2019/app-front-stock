import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Graphe1Quantite() {
  const { stateQteRentrantParMois } = useSelector((state) => state.tableauBord);

  const containerRef = useRef();
  const [width, setWidth] = useState(0);

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

  const fontSize = width < 400 ? 10 : width < 600 ? 12 : 14;
  const chartHeight = Math.max(250, Math.min(400, width * 0.5)); // auto height

  return (
    <div className="card shadow-sm" ref={containerRef}>
      <div className="card-header bg-secondary text-white">
        📊 Tendance des quantités par mois
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart data={stateQteRentrantParMois}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mois" tick={{ fontSize }} />
            <YAxis tick={{ fontSize }} />
            <Tooltip wrapperStyle={{ fontSize }} />
            <Legend wrapperStyle={{ fontSize }} />

            <Line
              type="monotone"
              dataKey="qte_rentree"
              stroke="#007bff"
              strokeWidth={3}
              name="Quantité Entrée"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="qte_vendu"
              stroke="#086905ff"
              strokeWidth={3}
              name="Quantité Vendue"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="qte_perdu"
              stroke="#131210ff"
              strokeWidth={3}
              name="Quantité Perdue"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="qte_expire"
              stroke="#0c15c1ff"
              strokeWidth={3}
              name="Quantité Expirée"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="qte_detruire"
              stroke="#f30e62ff"
              strokeWidth={3}
              name="Quantité Détruite"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphe1Quantite;
