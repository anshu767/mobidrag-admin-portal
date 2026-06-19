import { useState } from 'react';
import Topbar from '../layouts/Topbar';

const initialPayouts = [
  { id: 1, initials: 'SW', color: 'bg-violet-400', name: 'Shopify Wizards Agency', detail: '5 apps · 15% rate · Zara Glow + SoleSync', amount: '$1,860', due: 'June 15, 2025', status: 'Pending' },
  { id: 2, initials: 'EG', color: 'bg-amber-400',  name: 'Ecom Growth Studio',     detail: '3 apps · 12% rate · CleanSkin Co.',      amount: '$1,230', due: 'June 15, 2025', status: 'Pending' },
  { id: 3, initials: 'RS', color: 'bg-orange-400', name: 'RocketStack Consulting',  detail: '3 apps · 12% rate · LuxeWig Store',     amount: '$915',   due: 'June 15, 2025', status: 'Pending' },
  { id: 4, initials: 'MA', color: 'bg-blue-400',   name: 'Mobilify Agency',         detail: '2 apps · 10% rate · FitFlex Apparel',   amount: '$705',   due: 'May 30, 2025',  status: 'Paid' },
  { id: 5, initials: 'BC', color: 'bg-rose-400',   name: 'Brew Collective',         detail: '1 app  · 10% rate · Brew Co.',           amount: '$320',   due: 'May 30, 2025',  status: 'Paid' },
];

export default function Payouts() {
  const [payouts, setPayouts] = useState(initialPayouts);

  const markPaid = (id) => {
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'Paid' } : p));
  };

  const markAllPaid = () => {
    setPayouts(prev => prev.map(p => ({ ...p, status: 'Paid' })));
  };

  const pending = payouts.filter(p => p.status === 'Pending');
  const pendingTotal = pending.reduce((sum, p) => sum + parseInt(p.amount.replace(/\D/g, '')), 0);

  // Group by due date
  const groups = [...new Set(payouts.map(p => p.due))];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Topbar title="Payouts" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Pending Total</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">${pendingTotal.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Next Payout Day</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">Jun 15</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Partners Owed</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{pending.length}</p>
          </div>
        </div>

        {/* Payout groups */}
        {groups.map(due => {
          const group = payouts.filter(p => p.due === due);
          const groupPending = group.filter(p => p.status === 'Pending');
          return (
            <div key={due} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {/* Group header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-800">Pending payouts — {due}</h2>
                {groupPending.length > 0 && (
                  <button
                    onClick={markAllPaid}
                    className="px-4 py-2 bg-violet-600 text-white text-xs font-medium rounded-lg hover:bg-violet-700 transition-colors"
                  >
                    Mark all as paid
                  </button>
                )}
              </div>

              {/* Payout rows */}
              <div className="divide-y divide-slate-100">
                {group.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 px-5 py-4">
                    <div className={`w-9 h-9 rounded-full ${p.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {p.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">{p.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{p.detail}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mr-2">{p.amount}</p>

                    {p.status === 'Paid' ? (
                      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg">Paid</span>
                    ) : (
                      <button
                        onClick={() => markPaid(p.id)}
                        className="px-3 py-1.5 bg-violet-600 text-white text-xs font-medium rounded-lg hover:bg-violet-700 transition-colors"
                      >
                        Mark Paid
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}