import { useEffect, useState } from "react";
import api from "../services/api"; // ✅ use api instance
import Topbar from "../layouts/Topbar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const [data, setData] = useState({
    partners: 0,
    deals: 0,
    revenue: 0,
    payouts: 0,
    pipeline: {},
  });

  const fetchData = async () => {
    try {
      const res = await api.get("/admin/dashboard"); // 🔥 clean API
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels: ["Contacted", "Demo", "Negotiating", "Won"],
    datasets: [
      {
        label: "Deals",
        data: [
          data.pipeline?.contacted || 0,
          data.pipeline?.demo || 0,
          data.pipeline?.negotiating || 0,
          data.pipeline?.won || 0,
        ],
      },
    ],
  };

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Dashboard" />

      <div className="p-6 space-y-6">

        {/* 🔥 CARDS */}
        <div className="grid grid-cols-4 gap-5">
          <Card title="Total Partners" value={data.totalPartners} />
          <Card title="Revenue" value={`₹${data.totalRevenue}`} />
          <Card title="Pending Payouts" value={`₹${data.pendingPayouts}`} />
          <Card title="Active Deals" value={data.activeDeals} />
        </div>

        {/* 🔥 CHART */}
        <div className="bg-white p-5 rounded-lg border shadow-sm">
          <h2 className="text-base font-semibold mb-3">
            Pipeline Overview
          </h2>
          <Bar data={chartData} />
        </div>

        {/* 🔥 ATTENTION */}
        <div className="bg-white p-5 rounded-lg border shadow-sm">
          <h2 className="text-base font-semibold mb-2">
            Needs Attention
          </h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Pending applications</li>
            <li>• Payouts due</li>
            <li>• Stalled deals</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-lg border shadow-sm">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h2 className="text-lg font-semibold">{value}</h2>
    </div>
  );
}