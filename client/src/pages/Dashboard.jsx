import { useEffect, useState } from "react";
import api from "../services/api";
import Topbar from "../layouts/Topbar";

export default function Dashboard() {
  const [data, setData] = useState({
    totalPartners: 0,
    totalRevenue: 0,
    pendingPayouts: 0,
    activeDeals: 0,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setData(res.data.data);
      } catch {
        setData({
          totalPartners: 18,
          totalRevenue: 42300,
          pendingPayouts: 4005,
          activeDeals: 31,
        });
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Admin Dashboard" />

      <div className="p-6 grid grid-cols-2 gap-8">

        {/* 🔥 LEFT SIDE */}
        <div className="space-y-6">

          {/* TOP STATS */}
          <div className="grid grid-cols-2 gap-6">
            <Stat title="Total partners" value={data.totalPartners} sub="+4 this month" />
            <Stat title="Partner revenue" value={`$${data.totalRevenue}`} sub="+23% MoM" />
            <Stat title="Pending payouts" value={`$${data.pendingPayouts}`} sub="Due Jun 15" />
            <Stat title="Active deals" value={data.activeDeals} sub="3 stalled 7+ days" danger />
          </div>

          {/* NEEDS ATTENTION */}
          <div>
            <h3 className="font-semibold mb-3">Needs your attention</h3>

            <ul className="space-y-3 text-sm">

              <li className="flex gap-3">
                <span className="w-2 h-2 mt-2 bg-red-500 rounded-full"></span>
                <div>
                  3 partner applications pending review
                  <div className="text-xs text-gray-500">Oldest: 2 days ago</div>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="w-2 h-2 mt-2 bg-yellow-500 rounded-full"></span>
                <div>
                  3 payouts due
                  <div className="text-xs text-gray-500">Total $4,005</div>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="w-2 h-2 mt-2 bg-purple-500 rounded-full"></span>
                <div>Demo scheduled</div>
              </li>

            </ul>
          </div>

        </div>

        {/* 🔥 RIGHT SIDE */}
        <div className="space-y-6">

          {/* TOP PARTNERS */}
          <div>
            <h3 className="font-semibold mb-4">Top partners this month</h3>

            <div className="space-y-4 text-sm">

              <Partner name="Shopify Wizards Agency" amount="$12,400" />
              <Partner name="Ecom Growth Studio" amount="$8,200" />
              <Partner name="RocketStack Consulting" amount="$6,100" />
              <Partner name="Mobilify Agency" amount="$4,700" />

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// 🔥 SMALL COMPONENTS

function Stat({ title, value, sub, danger }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-semibold">{value}</h2>
      <p className={`text-xs ${danger ? "text-red-500" : "text-green-600"}`}>
        {sub}
      </p>
    </div>
  );
}

function Partner({ name, amount }) {
  return (
    <div className="flex justify-between items-center">
      <p>{name}</p>
      <p className="font-medium">{amount}</p>
    </div>
  );
}