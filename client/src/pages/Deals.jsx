import { useState } from 'react';
import Topbar from '../layouts/Topbar';
import { ArrowLeft, Calendar, User, DollarSign } from 'lucide-react';

const allDeals = [
  { id: 1, company: 'FitFlex Apparel',    partner: 'Shopify Wizards', stage: 'Demo scheduled', value: '$3,200/mo', lastUpdate: '1 day ago',   stalled: false, contact: 'Ananya Sharma', email: 'ananya@fitflex.in',   notes: 'Demo booked for Jun 10 at 3PM IST. Partner confirmed attendance.' },
  { id: 2, company: 'TechNova Solutions', partner: 'Ecom Growth',     stage: 'Negotiating',    value: '$2,800/mo', lastUpdate: '3 days ago',  stalled: false, contact: 'Rahul Mehta',   email: 'rahul@technova.io',   notes: 'Pricing discussion ongoing. Client wants a 3-month pilot.' },
  { id: 3, company: 'Brew Collective',    partner: 'Brew Collective',  stage: 'Demo done',      value: '$1,400/mo', lastUpdate: '9 days ago',  stalled: true,  contact: 'Sam Wilson',    email: 'sam@brew.co',         notes: 'Demo went well but no follow-up. Partner should nudge.' },
  { id: 4, company: 'NailLab India',      partner: 'Mobilify Agency',  stage: 'Contacted',      value: '$900/mo',   lastUpdate: '8 days ago',  stalled: true,  contact: 'Priya Nair',    email: 'priya@naillab.in',    notes: 'Initial outreach sent. No reply yet from prospect.' },
  { id: 5, company: 'HomeDecor Hub',      partner: 'RocketStack',      stage: 'Demo done',      value: '$2,200/mo', lastUpdate: '12 days ago', stalled: true,  contact: 'Vikram Singh',  email: 'vikram@homedecor.co', notes: 'Demo completed. Decision maker was not present. Reschedule needed.' },
  { id: 6, company: 'GlowSkin Co.',       partner: 'Shopify Wizards',  stage: 'Won',            value: '$4,100/mo', lastUpdate: '5 days ago',  stalled: false, contact: 'Meera Joshi',   email: 'meera@glowskin.in',   notes: 'Deal closed! Onboarding scheduled for Jun 20.' },
];

const stageBadge = {
  'Contacted':      'bg-blue-100 text-blue-700',
  'Demo scheduled': 'bg-violet-100 text-violet-700',
  'Demo done':      'bg-amber-100 text-amber-700',
  'Negotiating':    'bg-orange-100 text-orange-700',
  'Won':            'bg-emerald-100 text-emerald-700',
};

export default function Deals() {
  const [selected, setSelected] = useState(null);

  const stalledCount = allDeals.filter(d => d.stalled).length;
  const deal = allDeals.find(d => d.id === selected);

  if (selected && deal) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={deal.company} />
        <main className="flex-1 overflow-y-auto p-6">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to All Deals
          </button>

          <div className="grid grid-cols-2 gap-6">
            {/* Deal details */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h2 className="text-sm font-semibold text-slate-700">Deal details</h2>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${stageBadge[deal.stage] || 'bg-slate-100 text-slate-600'}`}>
                  {deal.stage}
                </span>
                {deal.stalled && (
                  <span className="px-2 py-0.5 bg-red-50 text-red-500 text-xs rounded-full font-medium">Stalled {deal.lastUpdate}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Company</p>
                  <p className="font-medium text-slate-800">{deal.company}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Partner</p>
                  <p className="font-medium text-slate-800">{deal.partner}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Deal value</p>
                  <p className="font-semibold text-violet-600">{deal.value}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Last update</p>
                  <p className={deal.stalled ? 'text-red-500 font-medium' : 'text-slate-700'}>{deal.lastUpdate}</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <h2 className="text-sm font-semibold text-slate-700">Contact</h2>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center">
                  <User size={16} className="text-violet-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{deal.contact}</p>
                  <p className="text-xs text-slate-400">{deal.email}</p>
                </div>
              </div>
              <button className="w-full mt-2 py-2 border border-violet-200 text-violet-600 text-sm rounded-lg hover:bg-violet-50 transition-colors">
                Send message
              </button>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 col-span-2">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Notes</h2>
              <p className="text-sm text-slate-600">{deal.notes}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Topbar title="All Deals" />
      <main className="flex-1 overflow-y-auto p-6">
        {stalledCount > 0 && (
          <div className="flex gap-3 mb-5">
            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              {stalledCount} stalled 7+ days
            </span>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
          {allDeals.map((deal) => (
            <div key={deal.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                <div>
                  <p className="text-sm font-medium text-slate-800">{deal.company}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{deal.partner}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium w-fit ${stageBadge[deal.stage] || 'bg-slate-100 text-slate-600'}`}>
                  {deal.stage}
                </span>
                <p className="text-sm text-slate-700">{deal.value}</p>
                <p className={`text-xs ${deal.stalled ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
                  {deal.stalled ? `⚠ Stalled · ${deal.lastUpdate}` : deal.lastUpdate}
                </p>
              </div>
              <button
                onClick={() => setSelected(deal.id)}
                className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-violet-600 border border-violet-200 rounded-lg hover:bg-violet-50 transition-colors"
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}