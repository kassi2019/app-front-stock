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

function PaiementParMode() {
  const { stateEvolutionQteVenduParModePaiement } = useSelector(
    (state) => state.tableauBordCaissier
  );

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
        📊 Tendance Montant par mode de paiement par Jours
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart data={stateEvolutionQteVenduParModePaiement}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jour" tick={{ fontSize }} />
            <YAxis tick={{ fontSize }} />
            <Tooltip wrapperStyle={{ fontSize }} />
            <Legend wrapperStyle={{ fontSize }} />

            <Line
              type="monotone"
              dataKey="espèce"
              stroke="#007bff"
              strokeWidth={3}
              name="Espèce"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="orange money"
              stroke="#086905ff"
              strokeWidth={3}
              name="Orange Money"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="mtn money"
              stroke="#131210ff"
              strokeWidth={3}
              name="MTN Money"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="wave"
              stroke="#0c15c1ff"
              strokeWidth={3}
              name="Wave"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="moov money"
              stroke="#f30e62ff"
              strokeWidth={3}
              name="Moov money"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="djamo"
              stroke="#99b60cff"
              strokeWidth={3}
              name="Djamo"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="push"
              stroke="rgba(18, 136, 91, 1)"
              strokeWidth={3}
              name="Push"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PaiementParMode;
