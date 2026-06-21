import { useState, useEffect } from "react";
import api from "../services/api";
import Topbar from "../layouts/Topbar";

export default function Partners() {
  const [partners, setPartners] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  // 🔥 FETCH PARTNERS
  const fetchPartners = async () => {
    try {
      const res = await api.get("/admin/partners");
      const realData = res.data.data || [];

      if (realData.length > 0) {
        setPartners(realData);
      } else {
        throw new Error("Empty");
      }

    } catch {
      console.log("Using dummy partners");

      // ✅ DUMMY DATA (reference jaisa)
      setPartners([
        {
          _id: "1",
          name: "Shopify Wizards Agency",
          email: "shopify@agency.com",
          tier: "Platinum",
          revenue: 12400,
          commission: 1860,
          status: "Active",
        },
        {
          _id: "2",
          name: "Ecom Growth Studio",
          email: "ecom@growth.com",
          tier: "Gold",
          revenue: 8200,
          commission: 1230,
          status: "Active",
        },
      ]);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // 🔥 ADD PARTNER (frontend working)
  const handleAdd = async () => {
    if (!form.name || !form.email) return alert("Fill all fields");

    try {
      await api.post("/admin/partners", form);
      fetchPartners();
    } catch {
      // 🔥 fallback (frontend add)
      setPartners([
        ...partners,
        {
          _id: Date.now(),
          name: form.name,
          email: form.email,
          tier: "Silver",
          revenue: 0,
          commission: 0,
          status: "Active",
        },
      ]);
    }

    setForm({ name: "", email: "" });
  };

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="All Partners" />

      <main className="p-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">

          {/* 🔥 HEADER */}
          <div className="flex justify-between mb-4">
            <input
              placeholder="Search partners..."
              className="w-1/2 px-3 py-2 border rounded-md text-sm"
            />

            <button
              onClick={handleAdd}
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Add Partner
            </button>
          </div>

          {/* 🔥 FORM */}
          <div className="flex gap-3 mb-4">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="border px-3 py-2 text-sm rounded-md"
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="border px-3 py-2 text-sm rounded-md"
            />
          </div>

          {/* ❌ EMPTY */}
          {partners.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No partners found
            </p>
          ) : (

            <table className="w-full text-sm">
              <thead className="text-gray-500 border-b text-left">
                <tr>
                  <th className="py-3">Partner</th>
                  <th>Tier</th>
                  <th>Revenue</th>
                  <th>Commission</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {partners.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">

                    <td className="py-4">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-400">
                        {p.email}
                      </div>
                    </td>

                    <td>{p.tier}</td>

                    <td>₹{p.revenue}</td>

                    <td className="text-green-600">
                      ₹{p.commission}
                    </td>

                    <td>
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                        {p.status}
                      </span>
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
