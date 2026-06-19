import { useState } from "react";
import { FileText, FileSpreadsheet, FileVideo, FileArchive } from "lucide-react";
import Toggle from "../components/Toggle";

const initialResources = [
  {
    id: 1,
    name: "MobiDrag Sales Deck 2025",
    type: "PPTX",
    size: "2.4 MB",
    uploaded: "May 1",
    category: "Sales decks",
    color: "bg-rose-100 text-rose-500",
    icon: FileText,
    visible: true,
  },
  {
    id: 2,
    name: "Partner One-Pager",
    type: "PDF",
    size: "890 KB",
    uploaded: "May 1",
    category: "PDFs",
    color: "bg-rose-100 text-rose-500",
    icon: FileText,
    visible: true,
  },
  {
    id: 3,
    name: "Demo Walkthrough Video",
    type: "MP4",
    size: "45 MB",
    uploaded: "May 3",
    category: "Videos",
    color: "bg-blue-100 text-blue-500",
    icon: FileVideo,
    visible: true,
  },
  {
    id: 4,
    name: "ROI Calculator Template",
    type: "XLSX",
    size: "120 KB",
    uploaded: "May 10",
    category: "Templates",
    color: "bg-emerald-100 text-emerald-500",
    icon: FileSpreadsheet,
    visible: true,
  },
  {
    id: 5,
    name: "Objection Handling Guide",
    type: "PDF",
    size: "340 KB",
    uploaded: "May 15",
    category: "PDFs",
    color: "bg-rose-100 text-rose-500",
    icon: FileText,
    visible: true,
  },
  {
    id: 6,
    name: "MobiDrag Brand Assets",
    type: "ZIP",
    size: "8.1 MB",
    uploaded: "Apr 28",
    category: "Templates",
    color: "bg-gray-100 text-gray-500",
    icon: FileArchive,
    visible: false,
  },
];

export default function Resources() {
  const [resources, setResources] = useState(initialResources);

  const toggleVisibility = (id) =>
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, visible: !r.visible } : r))
    );

  const visibleCount = resources.filter((r) => r.visible).length;

  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Resources</h1>
        <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
          Add partner
        </button>
      </div>

      {/* Sub header */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {visibleCount} files visible to all active partners
        </p>
        <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
          Upload resource
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
        {resources.map((file) => {
          const Icon = file.icon;
          return (
            <div
              key={file.id}
              className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${file.color}`}>
                <Icon size={18} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {file.type} · {file.size} · Uploaded {file.uploaded}
                </p>
              </div>

              <span className="w-28 text-sm text-gray-500">{file.category}</span>

              <Toggle
                checked={file.visible}
                onChange={() => toggleVisibility(file.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}