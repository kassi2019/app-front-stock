import React, { useRef, useState, useEffect } from "react";
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

function Graphe6MontantQuotidienneAnnee() {
  const { stateEvaluationVenteParAnnee } = useSelector(
    (state) => state.tableauBord
  );

  const containerRef = useRef();
  const [width, setWidth] = useState(0);

  // Observer la largeur du conteneur
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Taille du texte et hauteur du graphe adaptées à la largeur
  const fontSize = width < 400 ? 10 : width < 600 ? 12 : 14;
  const chartHeight = Math.max(250, Math.min(400, width * 0.5));

  return (
    <div className="card shadow-sm" ref={containerRef}>
      <div className="card-header bg-secondary text-white">
        📊{" "}
        <span style={{ fontSize: 18 }}>
          Tendance annuelle des ventes (en montant)
        </span>
      </div>

      <div className="card-body">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={stateEvaluationVenteParAnnee}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="annee" tick={{ fontSize }} />
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
                position="top"
                fill="#333"
                fontSize={fontSize}
                fontWeight="bold"
                formatter={(value) =>
                  value.toLocaleString("fr-FR") + " F"
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphe6MontantQuotidienneAnnee;
