import Topbar from "../layouts/Topbar";

export default function ProgramSettings() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Program Settings" />

      <main className="p-6 grid grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div className="space-y-8">

          {/* Commission */}
          <div>
            <h2 className="font-semibold mb-4">Commission tiers</h2>

            {[
              { name: "Silver", desc: "1–2 active apps per month", val: 10 },
              { name: "Gold", desc: "3–4 active apps per month", val: 12 },
              { name: "Platinum", desc: "5+ active apps per month", val: 15 },
            ].map((tier) => (
              <div key={tier.name} className="flex justify-between mb-4">
                <div>
                  <p className="font-medium">{tier.name}</p>
                  <p className="text-sm text-gray-400">{tier.desc}</p>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    defaultValue={tier.val}
                    className="w-16 border px-2 py-1 rounded"
                  />
                  %
                </div>
              </div>
            ))}
          </div>

          {/* Defaults */}
          <div>
            <h2 className="font-semibold mb-4">Program defaults</h2>

            <div className="flex justify-between mb-4">
              <div>
                <p>Payout day</p>
                <p className="text-sm text-gray-400">
                  Day of month payouts are processed
                </p>
              </div>
              <input
                type="number"
                defaultValue={15}
                className="w-16 border px-2 py-1 rounded"
              />
            </div>

            <div className="flex justify-between mb-4">
              <div>
                <p>Minimum payout</p>
                <p className="text-sm text-gray-400">
                  Below this, rolls to next cycle
                </p>
              </div>
              <div className="flex items-center gap-1">
                ${" "}
                <input
                  type="number"
                  defaultValue={100}
                  className="w-20 border px-2 py-1 rounded"
                />
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <div>
                <p>Referral cookie duration</p>
                <p className="text-sm text-gray-400">
                  Days a referral stays attributed
                </p>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  defaultValue={90}
                  className="w-16 border px-2 py-1 rounded"
                />
                days
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <p>Auto-approve applications</p>
                <p className="text-sm text-gray-400">
                  Skip manual review for low-risk applicants
                </p>
              </div>

              <input type="checkbox" className="toggle" defaultChecked />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">

          {/* Notifications */}
          <div>
            <h2 className="font-semibold mb-4">Notification settings</h2>

            {[
              "New deal registered",
              "New partner application",
              "Deal stalled 7+ days",
              "Payout reminders",
            ].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <p>{item}</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            ))}
          </div>

          {/* Admin */}
          <div>
            <h2 className="font-semibold mb-4">Admin team</h2>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-full">
                N
              </div>

              <div>
                <p className="font-medium">Nigam Shah</p>
                <p className="text-sm text-gray-400">
                  nigam@mobidrag.com
                </p>
              </div>

              <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">
                Owner
              </span>
            </div>

            <button className="text-purple-600 mt-4 text-sm">
              Invite team member
            </button>
          </div>

          {/* SAVE BUTTON */}
          <button className="w-full bg-purple-600 text-white py-3 rounded-lg mt-4">
            Save settings
          </button>

        </div>
      </main>
    </div>
  );
}