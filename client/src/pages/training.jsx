const modules = [
  {
    id: 1,
    title: "MobiDrag Product Overview",
    lessons: 5,
    completed: 18,
    total: 18,
    status: "Required",
  },
  {
    id: 2,
    title: "Demo and Sales Playbook",
    lessons: 8,
    completed: 14,
    total: 18,
    status: "Required",
  },
  {
    id: 3,
    title: "Handling Objections",
    lessons: 4,
    completed: 10,
    total: 18,
    status: "Optional",
  },
  {
    id: 4,
    title: "Advanced Features Deep-Dive",
    lessons: 6,
    completed: 5,
    total: 18,
    status: "Optional",
  },
  {
    id: 5,
    title: "Case Studies and ROI Proof",
    lessons: 3,
    completed: 2,
    total: 18,
    status: "Optional",
  },
];

export default function Training() {
  const totalPartners = modules[0]?.total ?? 0;
  const avgCompletion = Math.round(
    (modules.reduce((sum, m) => sum + m.completed / m.total, 0) / modules.length) * 100
  );

  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Training</h1>
        <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
          Add partner
        </button>
      </div>

      {/* Sub header */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {modules.length} modules · avg {avgCompletion}% completion across {totalPartners} partners
        </p>
        <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
          Add module
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
        {modules.map((m) => (
          <div key={m.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50">
            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-violet-50" />

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{m.title}</p>
              <p className="text-xs text-gray-500">
                {m.lessons} lessons · {m.completed}/{m.total} partners completed
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                m.status === "Required"
                  ? "bg-violet-100 text-violet-600"
                  : "border border-gray-200 text-gray-500"
              }`}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}