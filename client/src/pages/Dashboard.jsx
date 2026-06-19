import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("admin_token");

      const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data.data);
    };

    fetchDashboard();
  }, []);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">

      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <button className="bg-violet-600 text-white px-4 py-2 rounded-lg">
          Add partner
        </button>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <Card title="Total partners" value={data.totalPartners} sub="+4 this month" />
        <Card title="Partner revenue" value={`₹${data.revenue}`} sub="+23% MoM" />
        <Card title="Pending payouts" value={`₹${data.pendingPayouts}`} sub="Due soon" />
        <Card title="Active deals" value={data.activeDeals} sub="running deals" />
      </div>

      {/* MIDDLE */}
      <div className="grid grid-cols-2 gap-6">

        {/* NEEDS ATTENTION */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Needs your attention</h2>

          <ul className="space-y-3 text-sm">
            <li>🔴 3 partner applications pending</li>
            <li>🟡 ₹{data.pendingPayouts} payouts pending</li>
            <li>🟣 Demo scheduled</li>
            <li>🔴 Deals stalled</li>
          </ul>
        </div>

        {/* TOP PARTNERS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Top partners</h2>

          <ul className="space-y-3 text-sm">
            <li>Shopify Wizards — ₹12,400</li>
            <li>Ecom Growth — ₹8,200</li>
            <li>RocketStack — ₹6,100</li>
          </ul>
        </div>
      </div>

      {/* PIPELINE */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Pipeline overview</h2>

        <div className="grid grid-cols-5 gap-4 text-center text-sm">
          <Box label="Contacted" value="8" />
          <Box label="Demo" value="6" />
          <Box label="Negotiating" value="7" />
          <Box label="Won" value="6" />
        </div>
      </div>

    </div>
  );
}

/* 🔹 Small Components */

function Card({ title, value, sub }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
      <p className="text-xs text-green-500">{sub}</p>
    </div>
  );
}

function Box({ label, value }) {
  return (
    <div className="bg-gray-100 p-3 rounded-lg">
      <p>{label}</p>
      <h3 className="font-bold text-lg">{value}</h3>
    </div>
  );
}