import { useEffect, useState } from "react";
import axios from "axios";
import Topbar from "../layouts/Topbar";

export default function Training() {
  const [modules, setModules] = useState([]);

  // 🔥 fallback data (kabhi blank nahi hoga)
  const defaultModules = [
    { _id: 1, title: "Product Overview", lessons: 5 },
    { _id: 2, title: "Sales Playbook", lessons: 8 },
    { _id: 3, title: "Handling Objections", lessons: 4 },
  ];

  // ✅ FETCH MODULES
  const fetchModules = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/training");
      setModules(res.data.data || []);
    } catch (err) {
      console.log("API failed → using fallback");
      setModules(defaultModules);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // ✅ ADD MODULE (NO ALERT)
  const addModule = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/training", {
        title: "New Module",
        lessons: 5,
      });

      fetchModules();
    } catch (err) {
      console.log("Backend not ready → local add");

      // 🔥 UI me direct add (smooth demo)
      setModules((prev) => [
        ...prev,
        {
          _id: Date.now(),
          title: "New Module",
          lessons: 5,
        },
      ]);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Training" />

      <div className="p-6">

        {/* BUTTON */}
        <div className="flex justify-end mb-4">
          <button
            onClick={addModule}
            className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
          >
            Add Module
          </button>
        </div>

        {/* EMPTY STATE */}
        {modules.length === 0 && (
          <p className="text-gray-500">No modules found</p>
        )}

        {/* LIST */}
        {modules.map((m) => (
          <div key={m._id} className="bg-white p-4 mb-2 rounded border">
            <p className="font-medium">{m.title}</p>
            <p className="text-sm text-gray-500">{m.lessons} lessons</p>
          </div>
        ))}

      </div>
    </div>
  );
}