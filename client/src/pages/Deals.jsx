import { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../layouts/Topbar";
import { ArrowLeft } from "lucide-react";

export default function Deals() {
  const [selected, setSelected] = useState(null);
  const [deals, setDeals] = useState([]);

  // ✅ FETCH DEALS
  const fetchDeals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/deals");
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
      await axios.patch(
        `http://localhost:5000/api/admin/deals/${dealId}/stage`,
        { stage }
      );

      alert("Stage updated");
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
        <div className="bg-white border rounded-lg">

          {deals.length === 0 && (
            <p className="p-4 text-gray-500">No deals found</p>
          )}

          {deals.map((deal) => (
            <div
              key={deal._id}
              className="flex items-center justify-between p-4 border-b"
            >
              <div>
                <p className="font-medium">{deal.brandName}</p>
                <p className="text-xs text-gray-400">
                  {deal.partnerId?.name || "No Partner"}
                </p>
              </div>

              <select
                value={deal.stage}
                onChange={(e) => updateStage(deal._id, e.target.value)}
                className="border px-2 py-1"
              >
                <option value="contacted">Contacted</option>
                <option value="demo">Demo</option>
                <option value="negotiating">Negotiating</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>

              <p>₹{deal.amount}</p>

              <button
                onClick={() => setSelected(deal._id)}
                className="px-3 py-1 text-xs border text-violet-600"
              >
                Open
              </button>
            </div>
          ))}

        </div>
      </main>
    </div>
  );
}