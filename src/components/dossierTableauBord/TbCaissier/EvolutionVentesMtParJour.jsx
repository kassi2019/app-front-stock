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
  LabelList,
} from "recharts";
function EvolutionVentesMtParJour() {
  const { stateEvolutionVenduParJoursCaissier } = useSelector(
    (state) => state.tableauBordCaissier
  );

  const containerRef = useRef();
  const [width, setWidth] = useState(0);

  // 🔹 Trouver la quantité maximale
  const maxValue = Math.max(
    ...(stateEvolutionVenduParJoursCaissier?.map((d) => d.total_vendu) || [0])
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
          <LineChart data={stateEvolutionVenduParJoursCaissier}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jours" tick={{ fontSize }} />
            <YAxis tick={{ fontSize }} />
            <Tooltip wrapperStyle={{ fontSize }} />
            <Legend wrapperStyle={{ fontSize }} />

            <Line
              type="monotone"
              dataKey="total_vendu"
              stroke="#131210ff"
              strokeWidth={3}
              name="Montant Vendu"
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            >
              <LabelList dataKey="total_vendu" content={<CustomLabel />} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EvolutionVentesMtParJour;
