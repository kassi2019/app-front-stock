import React from "react";
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

function Graphe8MontantQuotidienneMois() {
  const { stateEvaluationVenteParMois } = useSelector(
    (state) => state.tableauBord
  );

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-secondary text-white">
        📊{" "}
        <span style={{ fontSize: 18 }}>
          Tendance mensuelle des ventes (en montant)
        </span>
      </div>

      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={stateEvaluationVenteParMois}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mois" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="total_vendu"
              fill="#007bff"
              radius={[10, 10, 0, 0]} // coins arrondis (optionnel)
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            >
              {/* 🔹 Afficher le montant à l’intérieur de la barre */}
              <LabelList
                dataKey="total_vendu"
                position="insideTop"
                fill="#fff" // blanc pour être lisible sur fond bleu
                fontSize={14}
                fontWeight="bold"
                formatter={(value) =>
                  value.toLocaleString("fr-FR") + " F" // formatage avec "F"
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphe8MontantQuotidienneMois;
