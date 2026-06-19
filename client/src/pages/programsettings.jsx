import { useState } from "react";
import Toggle from "../components/Toggle";

const initialTiers = [
  { id: "silver", name: "Silver", desc: "1–2 active apps per month", value: 10 },
  { id: "gold", name: "Gold", desc: "3–4 active apps per month", value: 12 },
  { id: "platinum", name: "Platinum", desc: "5+ active apps per month", value: 15 },
];

const initialNotifications = [
  {
    id: "newDeal",
    label: "New deal registered",
    desc: "Email Nigam when a partner registers a deal",
    checked: true,
  },
  {
    id: "newApplication",
    label: "New partner application",
    desc: "Email Nigam on new applications",
    checked: true,
  },
  {
    id: "stalledDeal",
    label: "Deal stalled 7+ days",
    desc: "Daily digest of stalled deals",
    checked: true,
  },
  {
    id: "payoutReminder",
    label: "Payout reminders",
    desc: "Remind 2 days before payout day",
    checked: true,
  },
];

export default function ProgramSettings() {
  const [tiers, setTiers] = useState(initialTiers);
  const [payoutDay, setPayoutDay] = useState(15);
  const [minPayout, setMinPayout] = useState(100);
  const [cookieDays, setCookieDays] = useState(90);
  const [autoApprove, setAutoApprove] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const updateTier = (id, value) =>
    setTiers((prev) => prev.map((t) => (t.id === id ? { ...t, value } : t)));

  const toggleNotification = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, checked: !n.checked } : n))
    );

  const handleSave = () => {
    // TODO: wire this up to your API call, e.g.
    // await api.post("/program-settings", { tiers, payoutDay, minPayout, cookieDays, autoApprove, notifications });
    console.log("Saving settings...", {
      tiers,
      payoutDay,
      minPayout,
      cookieDays,
      autoApprove,
      notifications,
    });
  };

  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Program Settings</h1>
        <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
          Add partner
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="space-y-10">
          {/* Commission tiers */}
          <section>
            <h2 className="mb-4 text-base font-semibold text-gray-900">Commission tiers</h2>
            <div className="space-y-5">
              {tiers.map((tier) => (
                <div key={tier.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tier.name}</p>
                    <p className="text-xs text-gray-500">{tier.desc}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={tier.value}
                      onChange={(e) => updateTier(tier.id, Number(e.target.value))}
                      className="w-14 rounded-md border border-gray-200 px-2 py-1 text-right text-sm"
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Program defaults */}
          <section>
            <h2 className="mb-4 text-base font-semibold text-gray-900">Program defaults</h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Payout day</p>
                  <p className="text-xs text-gray-500">Day of month payouts are processed</p>
                </div>
                <input
                  type="number"
                  value={payoutDay}
                  onChange={(e) => setPayoutDay(Number(e.target.value))}
                  className="w-16 rounded-md border border-gray-200 px-2 py-1 text-right text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Minimum payout</p>
                  <p className="text-xs text-gray-500">Below this, rolls to next cycle</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-500">$</span>
                  <input
                    type="number"
                    value={minPayout}
                    onChange={(e) => setMinPayout(Number(e.target.value))}
                    className="w-16 rounded-md border border-gray-200 px-2 py-1 text-right text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Referral cookie duration</p>
                  <p className="text-xs text-gray-500">Days a referral stays attributed</p>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={cookieDays}
                    onChange={(e) => setCookieDays(Number(e.target.value))}
                    className="w-16 rounded-md border border-gray-200 px-2 py-1 text-right text-sm"
                  />
                  <span className="text-sm text-gray-500">days</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Auto-approve applications</p>
                  <p className="text-xs text-gray-500">Skip manual review for low-risk applicants</p>
                </div>
                <Toggle checked={autoApprove} onChange={setAutoApprove} />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-10">
          {/* Notification settings */}
          <section>
            <h2 className="mb-4 text-base font-semibold text-gray-900">Notification settings</h2>
            <div className="space-y-5">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{n.label}</p>
                    <p className="text-xs text-gray-500">{n.desc}</p>
                  </div>
                  <Toggle checked={n.checked} onChange={() => toggleNotification(n.id)} />
                </div>
              ))}
            </div>
          </section>

          {/* Admin team */}
          <section>
            <h2 className="mb-4 text-base font-semibold text-gray-900">Admin team</h2>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                N
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Nigam Shah</p>
                <p className="text-xs text-gray-500">Owner · nigam@mobidrag.com</p>
              </div>
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-600">
                Owner
              </span>
            </div>
            <button className="text-sm font-medium text-violet-600 hover:text-violet-700">
              Invite team member
            </button>
          </section>

          <button
            onClick={handleSave}
            className="w-full rounded-lg bg-violet-600 py-3 text-sm font-medium text-white hover:bg-violet-700"
          >
            Save settings
          </button>
        </div>
      </div>
    </div>
  );
}