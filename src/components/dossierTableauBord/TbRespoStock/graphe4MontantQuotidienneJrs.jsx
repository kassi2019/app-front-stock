import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
  LabelList,
} from "recharts";

function Graphe4MontantQuotidienneJrs() {
  const { stateEvaluationVenteParJour } = useSelector(
    (state) => state.tableauBord
  );

  const containerRef = useRef();
  const [width, setWidth] = useState(0);

  // Observer la taille du conteneur pour adapter le style
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Taille de texte dynamique
  const fontSize = width < 400 ? 10 : width < 600 ? 12 : 14;
  const chartHeight = Math.max(250, Math.min(400, width * 0.5));

  return (
    <div className="card shadow-sm" ref={containerRef}>
      <div className="card-header bg-secondary text-white">
        📊{" "}
        <span style={{ fontSize: 18 }}>
          Tendance journalière des ventes (en Montant)
        </span>
      </div>

      <div className="card-body">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={stateEvaluationVenteParJour}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jours" tick={{ fontSize }} />
            <YAxis tick={{ fontSize }} />
            <Tooltip wrapperStyle={{ fontSize }} />
            <Legend wrapperStyle={{ fontSize }} />

            <Bar
              dataKey="total_vendu"
              fill="#007bff"
              radius={[10, 10, 0, 0]}
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            >
              <LabelList
                dataKey="total_vendu"
                position="top" // Plus visible sur mobile
                fill="#333"
                fontSize={fontSize}
                fontWeight="bold"
                formatter={(value) => value.toLocaleString("fr-FR") + " F"}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphe4MontantQuotidienneJrs;
