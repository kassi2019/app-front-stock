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

function Graphe3QteQuotidienneJrs() {
  const { stateEvaluationVenteParJour } = useSelector(
    (state) => state.tableauBord
  );

  const containerRef = useRef();
  const [width, setWidth] = useState(0);

  // Suivre dynamiquement la largeur du conteneur
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const fontSize = width < 400 ? 10 : width < 600 ? 12 : 14;
  const chartHeight = Math.max(250, Math.min(400, width * 0.5));

  return (
    <div className="card shadow-sm" ref={containerRef}>
      <div className="card-header bg-secondary text-white">
        📊{" "}
        <span style={{ fontSize: 18 }}>
          Tendance journalière des ventes (en quantité)
        </span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart
            data={stateEvaluationVenteParJour}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jours" tick={{ fontSize }} />
            <YAxis tick={{ fontSize }} />
            <Tooltip wrapperStyle={{ fontSize }} />
            <Legend wrapperStyle={{ fontSize }} />
            <Line
              type="monotone"
              dataKey="qte_vendu"
              stroke="#086905ff"
              fill="#086905ff"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphe3QteQuotidienneJrs;
