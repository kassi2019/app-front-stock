import React from "react";
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
} from "recharts";
import { useSelector } from "react-redux";
function Graphe2QteExpirer() {
  const { stateProduitExpire } = useSelector((state) => state.tableauBord);
  return (
    <div>
      <div className="card shadow-sm">
        <div className="card-header bg-secondary text-white">
          📉 Variation des quantités par produit
          {/* ({periode}) */}
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={stateProduitExpire}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="produit" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="qteInitial" stackId="b" fill="#007bff" />
              <Bar dataKey="qteexpiration" stackId="a" fill="#e78309ff" />
              <Bar dataKey="qtevendue" stackId="a" fill="#0a8d3cff" />
              <Bar dataKey="qtepertes" stackId="a" fill="#131210ff" />
              <Bar dataKey="qteDisponible" stackId="a" fill="#ef0909ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Graphe2QteExpirer;
