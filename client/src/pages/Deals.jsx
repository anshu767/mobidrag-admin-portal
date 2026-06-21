import { useState, useEffect } from "react";
import api from "../services/api"; // ✅ IMPORTANT FIX
import Topbar from "../layouts/Topbar";
import { ArrowLeft } from "lucide-react";

export default function Deals() {
  const [selected, setSelected] = useState(null);
  const [deals, setDeals] = useState([]);

  // ✅ FETCH DEALS
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

  // ✅ UPDATE STAGE
  const updateStage = async (dealId, stage) => {
    try {
      await api.patch(`/admin/deals/${dealId}/stage`, { stage });
      fetchDeals();
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating stage");
    }
  };

  const deal = deals.find((d) => d._id === selected);

  // 🔍 SINGLE DEAL VIEW
  if (selected && deal) {
    return (
      <div className="flex-1 flex flex-col">
        <Topbar title={deal.brandName || "Deal"} />

        <main className="p-6">
          <button
            onClick={() => setSelected(null)}
            className="mb-4 text-sm text-gray-500 flex items-center gap-1"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="bg-white p-5 border rounded-lg">
            <h2 className="font-semibold mb-3">Deal Details</h2>

            <select
              value={deal.stage}
              onChange={(e) => updateStage(deal._id, e.target.value)}
              className="border px-2 py-1 mb-3"
            >
              <option value="contacted">Contacted</option>
              <option value="demo">Demo</option>
              <option value="negotiating">Negotiating</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>

            <p><b>Company:</b> {deal.brandName}</p>
            <p><b>Partner:</b> {deal.partnerId?.name || "N/A"}</p>
            <p><b>Amount:</b> ₹{deal.amount}</p>
          </div>
        </main>
      </div>
    );
  }

  // 📋 ALL DEALS VIEW
  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="All Deals" />

      <main className="p-6">
        <div className="bg-white rounded-xl p-6 shadow">

          {/* Tabs */}
          <div className="flex gap-6 mb-4 text-sm">
            <span className="text-purple-600 border-b-2 border-purple-600 pb-1">
              All ({deals.length})
            </span>
            <span>Needs action</span>
            <span>Won</span>
            <span>Lost</span>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by brand or partner..."
            className="w-full mb-4 p-2 border rounded-md"
          />

          {/* EMPTY */}
          {deals.length === 0 ? (
            <p className="text-gray-400 text-center py-10">
              No deals found
            </p>
          ) : (

            <table className="w-full text-sm">
              <thead className="text-left text-gray-500 border-b">
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
                  <tr key={deal._id} className="border-b hover:bg-gray-50">

                    {/* BRAND */}
                    <td className="py-4">
                      <div className="font-medium">{deal.brandName}</div>
                      <div className="text-gray-400 text-xs">
                        {deal.website || "example.com"}
                      </div>
                    </td>

                    {/* PARTNER */}
                    <td>{deal.partnerId?.name || "No Partner"}</td>

                    {/* PLAN */}
                    <td className="text-purple-600">
                      ₹{deal.amount || 0}
                    </td>

                    {/* STAGE */}
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        deal.stage === "won"
                          ? "bg-green-100 text-green-600"
                          : deal.stage === "demo"
                          ? "bg-yellow-100 text-yellow-700"
                          : deal.stage === "negotiating"
                          ? "bg-purple-100 text-purple-600"
                          : deal.stage === "lost"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {deal.stage}
                      </span>
                    </td>

                    {/* DATE */}
                    <td>
                      {deal.updatedAt
                        ? new Date(deal.updatedAt).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* ACTION */}
                    <td>
                      <button
                        onClick={() => setSelected(deal._id)}
                        className="text-blue-600 hover:underline"
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