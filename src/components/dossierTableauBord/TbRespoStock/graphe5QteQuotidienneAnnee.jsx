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

function Graphe3QteQuotidienneAnnee() {
  const { stateEvaluationVenteParAnnee } = useSelector(
    (state) => state.tableauBord
  );

  const containerRef = useRef();
  const [width, setWidth] = useState(0);

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
          Tendance annuelle des ventes (en quantité)
        </span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={stateEvaluationVenteParAnnee}
            margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="annee" tick={{ fontSize }} />
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
                fontWeight="bold"
                formatter={(value) =>
                  value.toLocaleString("fr-FR") // formatage français
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphe3QteQuotidienneAnnee;
