import React from "react";
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
  BarChart,
  Bar,
  Rectangle,
  LabelList,
} from "recharts";

function Graphe3QteQuotidienneAnnee() {
  const { stateEvaluationVenteParAnnee } = useSelector(
    (state) => state.tableauBord
  );

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-secondary text-white">
        📊
        <span style={{ fontSize: 18 }}>
          Tendance annuelle des ventes (en quantité)
        </span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={500}
            height={300}
            data={stateEvaluationVenteParAnnee}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="annee" />
            <YAxis />
            <Tooltip />
            <Legend />
            
            <Bar
              dataKey="qte_vendu"
              fill="#086905ff"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            >
              {/* 🔹 Afficher la quantité au-dessus de chaque barre */}
              

               <LabelList
                              dataKey="qte_vendu"
                              position="insideTop"
                              fill="#fff" // blanc pour être lisible sur fond bleu
                              fontSize={14}
                              fontWeight="bold"
                              formatter={(value) =>
                                value.toLocaleString("fr-FR")  // formatage avec "F"
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
