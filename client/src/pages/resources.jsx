import { useEffect, useState } from "react";
import axios from "axios";
import Topbar from "../layouts/Topbar";

export default function Resources() {
  const [resources, setResources] = useState([]);

  // 🔥 fallback data (kabhi blank nahi)
  const defaultData = [
    { _id: 1, title: "Sales Deck", type: "PPT" },
    { _id: 2, title: "Demo Video", type: "Video" },
    { _id: 3, title: "ROI Template", type: "Excel" },
  ];

  // ✅ FETCH
  const fetchResources = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/resources");
      setResources(res.data.data || []);
    } catch (err) {
      console.log("API failed → fallback");
      setResources(defaultData);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // ✅ ADD RESOURCE (NO ALERT)
  const addResource = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/resources", {
        title: "New Resource",
        type: "PDF",
      });

      fetchResources();
    } catch (err) {
      console.log("Backend not ready → local add");

      // 🔥 UI me direct add
      setResources((prev) => [
        ...prev,
        {
          _id: Date.now(),
          title: "New Resource",
          type: "PDF",
        },
      ]);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Resources" />

      <div className="p-6">

        {/* BUTTON */}
        <div className="flex justify-end mb-4">
          <button
            onClick={addResource}
            className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
          >
            Upload Resource
          </button>
        </div>

        {/* EMPTY STATE */}
        {resources.length === 0 && (
          <p className="text-gray-500">No resources found</p>
        )}

        {/* LIST */}
        {resources.map((r) => (
          <div key={r._id} className="bg-white p-4 mb-2 rounded border">
            <p className="font-medium">{r.title}</p>
            <p className="text-sm text-gray-500">{r.type}</p>
          </div>
        ))}

      </div>
    </div>
  );
}