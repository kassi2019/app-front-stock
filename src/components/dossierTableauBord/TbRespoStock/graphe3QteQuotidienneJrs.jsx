import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
  LabelList,
} from "recharts";

function Graphe3QteQuotidienneJrs() {
  const { stateEvaluationVenteParJour } = useSelector(
    (state) => state.tableauBord
  );

  const containerRef = useRef();
  const [width, setWidth] = useState(0);

  // Hook pour détecter la largeur du conteneur
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

  // Ajuster la taille du texte selon la largeur
  const fontSize = width < 400 ? 10 : width < 600 ? 12 : 14;

  return (
    <div className="card shadow-sm" ref={containerRef}>
      <div className="card-header bg-secondary text-white">
        📊{" "}
        <span style={{ fontSize: 18 }}>
          Tendance journalière des ventes (en quantité)
        </span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
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
              dataKey="qte_vendu"
              fill="#086905ff"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            >
              <LabelList
                dataKey="qte_vendu"
                position="top"
                fill="#333"
                fontSize={fontSize}
                formatter={(value) => value.toLocaleString("fr-FR")}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphe3QteQuotidienneJrs;
