import { useEffect, useState } from "react";
import api from "../services/api";
import Topbar from "../layouts/Topbar";

export default function Partners() {
  const [partners, setPartners] = useState([]);

  const fetchPartners = async () => {
    try {
      const res = await api.get("/admin/partners");
      console.log("PARTNERS:", res.data);
      setPartners(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err.response || err);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="All Partners" />

      <main className="p-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-5 text-sm">
              <span className="text-purple-600 border-b-2 border-purple-600 pb-1">
                All ({partners.length})
              </span>
              <span className="text-gray-500">Platinum</span>
              <span className="text-gray-500">Gold</span>
              <span className="text-gray-500">Silver</span>
              <span className="text-gray-500">Inactive</span>
            </div>

            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm">
              Add Partner
            </button>
          </div>

          {/* SEARCH */}
          <input
            placeholder="Search partners..."
            className="w-full mb-4 px-3 py-2 text-sm border rounded-md"
          />

          {/* TABLE */}
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b text-left">
              <tr>
                <th className="py-3">Partner</th>
                <th>Tier</th>
                <th>Apps sold</th>
                <th>Revenue</th>
                <th>Commission</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {partners.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">

                  {/* NAME */}
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs">
                      {p.name?.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-400">
                        {p.city || "India"}
                      </div>
                    </div>
                  </td>

                  {/* TIER */}
                  <td>
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
                      {p.tier || "Silver"}
                    </span>
                  </td>

                  {/* APPS */}
                  <td>{p.apps || 0}</td>

                  {/* REVENUE */}
                  <td>${p.revenue || 0}</td>

                  {/* COMMISSION */}
                  <td className="text-green-600">
                    ${p.commission || 0}
                  </td>

                  {/* STATUS */}
                  <td>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      p.status === "inactive"
                        ? "bg-gray-200 text-gray-600"
                        : "bg-green-100 text-green-600"
                    }`}>
                      {p.status || "active"}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td>
                    <button className="text-purple-600 hover:underline">
                      Manage
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY */}
          {partners.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              No partners found
            </p>
          )}

        </div>
      </main>
    </div>
  );
}