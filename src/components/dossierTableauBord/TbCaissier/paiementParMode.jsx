import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
 ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
function PaiementParMode() {
  const { stateEvolutionQteVenduParModePaiement } = useSelector(
    (state) => state.tableauBordCaissier
  );

  const containerRef = useRef();
  const [width, setWidth] = useState(0);

  // 🔹 Trouver la quantité maximale
  const maxValue = Math.max(
    ...(stateEvolutionQteVenduParModePaiement?.map((d) => d.total_vendu) || [0])
  );

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
  const chartHeight = Math.max(250, Math.min(400, width * 0.5));

  // 🔹 Dot personnalisé (vert pour la valeur max)
  const CustomDot = (props) => {
    const { cx, cy, value } = props;
    const isMax = value === maxValue;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isMax ? 7 : 6}
        fill={isMax ? "green" : "#e60a0aff"}
        stroke="white"
        strokeWidth={isMax ? 2 : 1}
      />
    );
  };

  // 🔹 Label au-dessus de chaque point
  const CustomLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text
        x={x}
        y={y - 10}
        textAnchor="middle"
        fontSize={12}
        fill="#000"
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="card shadow-sm" ref={containerRef}>
      <div className="card-header bg-secondary text-white">
        📊 Tendance Montant Vendu par Jours
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
          dataKey="Especes"
          stroke="#008000"
          strokeWidth={2}
          name="Espèces"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Wave"
          stroke="#0000FF"
          strokeWidth={2}
          name="Wave"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Orange Money"
          stroke="#FFA500"
          strokeWidth={2}
          name="Orange Money"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PaiementParMode;
