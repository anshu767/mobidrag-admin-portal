import { useState, useEffect } from "react";
import api from "../services/api";
import Topbar from "../layouts/Topbar";

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [selected, setSelected] = useState(null);

  // 🔥 FETCH DEALS
  const fetchDeals = async () => {
    try {
      const res = await api.get("/admin/deals");
      setDeals(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  // 🔥 UPDATE STAGE
  const updateStage = async (id, stage) => {
    try {
      await api.patch(`/admin/deals/${id}/stage`, { stage });
      fetchDeals();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDeals = async () => {
  try {
    const res = await api.get("/admin/deals");
    console.log("DATA:", res.data); // 👈 ADD THIS
    setDeals(res.data.data || []);
  } catch (err) {
    console.error("Fetch error:", err.response || err);
  }
};

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="All Deals" />

      <main className="p-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">

          {/* ✅ HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-6 text-sm">
              <span className="text-purple-600 border-b-2 border-purple-600 pb-1">
                All ({deals.length})
              </span>
              <span className="text-gray-500">Needs action</span>
              <span className="text-gray-500">Won</span>
              <span className="text-gray-500">Lost</span>
            </div>

            <span className="text-xs text-gray-500">
              Sort: Most recent
            </span>
          </div>

          {/* 🔍 SEARCH */}
          <input
            placeholder="Search by brand or partner..."
            className="w-full mb-4 px-3 py-2 text-sm border rounded-md"
          />

          {/* ❌ EMPTY */}
          {deals.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No deals found
            </p>
          ) : (

            <table className="w-full text-sm">
              <thead className="text-gray-500 border-b text-left">
                <tr>
                  <th className="py-3">Brand</th>
                  <th>Partner</th>
                  <th>Plan</th>
                  <th>Stage</th>
                  <th>Updated</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {deals.map((deal) => (
                  <tr
                    key={deal._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* BRAND */}
                    <td className="py-4">
                      <div className="font-medium text-gray-800">
                        {deal.brandName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {deal.website || "example.com"}
                      </div>
                    </td>

                    {/* PARTNER */}
                    <td className="text-gray-700">
                      {deal.partnerId?.name || "—"}
                    </td>

                    {/* PLAN */}
                    <td className="text-purple-600 font-medium">
                      ₹{deal.amount || 0}
                    </td>

                    {/* STAGE */}
                    <td>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          deal.stage === "won"
                            ? "bg-green-100 text-green-600"
                            : deal.stage === "demo"
                            ? "bg-yellow-100 text-yellow-700"
                            : deal.stage === "negotiating"
                            ? "bg-purple-100 text-purple-600"
                            : deal.stage === "lost"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {deal.stage}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="text-gray-500 text-xs">
                      {deal.updatedAt
                        ? new Date(deal.updatedAt).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* ACTION */}
                    <td>
                      <button
                        onClick={() => setSelected(deal._id)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}