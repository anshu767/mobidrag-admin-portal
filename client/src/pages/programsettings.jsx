import { useEffect, useState } from "react";
import axios from "axios";
import Topbar from "../layouts/Topbar";

export default function ProgramSettings() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partners, setPartners] = useState([]);

  const token = localStorage.getItem("token");

  // 🔥 FETCH SAVED PARTNERS
  const fetchPartners = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/partners",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPartners(res.data.data || []);
    } catch (err) {
      console.log("Fetch failed");
    }
  };

  useEffect(() => {
    fetchPartners(); // 🔥 LOAD ON PAGE OPEN
  }, []);

  // 🔥 ADD PARTNER
  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/partners",
        {
          name,
          email,
          tier: "gold",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 🔥 instant update
      setPartners((prev) => [res.data.data, ...prev]);

      setShowForm(false);
      setName("");
      setEmail("");

    } catch (err) {
      console.error(err);
      alert("Error saving partner");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Program Settings" />

      <div className="p-6">

        {/* BUTTON */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-violet-600 text-white px-4 py-2 rounded"
          >
            Add Partner
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-white p-4 rounded border w-[300px] mb-4">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-full mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleAdd}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Save
            </button>
          </div>
        )}

        {/* 🔥 SHOW SAVED PARTNERS */}
        {partners.map((p) => (
          <div key={p._id} className="bg-white p-3 mb-2 rounded border">
            <p className="font-medium">{p.name}</p>
            <p className="text-sm text-gray-500">{p.email}</p>
          </div>
        ))}

      </div>
    </div>
  );
}