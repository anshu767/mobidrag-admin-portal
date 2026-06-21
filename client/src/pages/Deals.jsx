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
      <p className="text-gray-400 text-center py-10">No deals found</p>
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

              {/* STAGE BADGE */}
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
                {new Date(deal.updatedAt).toLocaleDateString()}
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