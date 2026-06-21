import { useState, useEffect } from "react";
import api from "../services/api";
import Topbar from "../layouts/Topbar";

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  // ✅ FETCH DEALS (with dummy fallback)
  const fetchDeals = async () => {
    try {
      const res = await api.get("/admin/deals");
      const realData = res.data.data || [];

      if (realData.length > 0) {
        setDeals(realData);
      } else {
        throw new Error("Empty");
      }

    } catch (err) {
      console.log("Using dummy data");

      // 🔥 DUMMY DATA (reference jaisa UI)
      setDeals([
        {
          _id: "1",
          brandName: "Zara Glow Beauty",
          website: "zaraglow.in",
          partnerId: { name: "Shopify Wizards" },
          stage: "won",
          amount: 499,
          updatedAt: new Date(),
        },
        {
          _id: "2",
          brandName: "FitFlex Apparel",
          website: "fitflexwear.com",
          partnerId: { name: "Shopify Wizards" },
          stage: "demo",
          amount: 499,
          updatedAt: new Date(),
        },
        {
          _id: "3",
          brandName: "Brew Collective",
          website: "brewcollective.in",
          partnerId: { name: "Shopify Wizards" },
          stage: "lost",
          amount: 299,
          updatedAt: new Date(),
        },
      ]);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  // 🔥 FILTER LOGIC
  const filteredDeals =
    activeTab === "all"
      ? deals
      : deals.filter((d) =>
          activeTab === "won"
            ? d.stage === "won"
            : activeTab === "lost"
            ? d.stage === "lost"
            : d.stage !== "won" && d.stage !== "lost"
        );

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="All Deals" />

      <main className="p-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">

          {/* 🔥 HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-6 text-sm">

              <span
                onClick={() => setActiveTab("all")}
                className={`cursor-pointer pb-1 ${
                  activeTab === "all"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500"
                }`}
              >
                All ({deals.length})
              </span>

              <span
                onClick={() => setActiveTab("needs")}
                className="cursor-pointer text-gray-500"
              >
                Needs action
              </span>

              <span
                onClick={() => setActiveTab("won")}
                className="cursor-pointer text-gray-500"
              >
                Won ({deals.filter(d => d.stage === "won").length})
              </span>

              <span
                onClick={() => setActiveTab("lost")}
                className="cursor-pointer text-gray-500"
              >
                Lost ({deals.filter(d => d.stage === "lost").length})
              </span>

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

          {/* TABLE */}
          {filteredDeals.length === 0 ? (
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
                {filteredDeals.map((deal) => (
                  <tr key={deal._id} className="border-b hover:bg-gray-50">

                    <td className="py-4">
                      <div className="font-medium">{deal.brandName}</div>
                      <div className="text-xs text-gray-400">
                        {deal.website || "example.com"}
                      </div>
                    </td>

                    <td>{deal.partnerId?.name || "—"}</td>

                    <td className="text-purple-600 font-medium">
                      ₹{deal.amount || 0}
                    </td>

                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs ${
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

                    <td className="text-xs text-gray-500">
                      {new Date(deal.updatedAt).toLocaleDateString()}
                    </td>

                    <td>
                      <button className="text-blue-600 hover:underline text-sm">
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