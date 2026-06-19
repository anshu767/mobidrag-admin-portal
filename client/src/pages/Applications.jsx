import { useState } from 'react';
import Topbar from '../layouts/Topbar';

const initialApps = [
  {
    id: 1,
    initials: 'NS', color: 'bg-emerald-400',
    company: 'NextGen Shopify',
    contact: 'Pankaj Patel',
    email: 'pankaj@nextgenshopify.in',
    city: 'Ahmedabad',
    applied: '2 days ago',
    website: 'nextgenshopify.in',
    stores: '6–20 stores',
    referralPlan: ['Own client base', 'LinkedIn outreach'],
    status: 'Pending',
  },
  {
    id: 2,
    initials: 'DC', color: 'bg-emerald-400',
    company: 'DigitalCart Solutions',
    contact: 'Meera Iyer',
    email: 'meera@digitalcart.co',
    city: 'Bangalore',
    applied: '1 day ago',
    website: 'digitalcart.co',
    stores: '20+ stores',
    referralPlan: ['Agency partnership', 'Content / Blog', 'Direct client referral'],
    status: 'Pending',
  },
  {
    id: 3,
    initials: 'PF', color: 'bg-orange-400',
    company: 'Pixel Forge Freelancer',
    contact: 'Arjun Desai',
    email: 'arjun.desai@gmail.com',
    city: 'Surat',
    applied: 'today',
    website: 'pixelforge.in',
    stores: '1–5 stores',
    referralPlan: ['Social media', 'Direct client referral'],
    status: 'Pending',
  },
  {
    id: 4,
    initials: 'GD', color: 'bg-blue-400',
    company: 'GrowthLab Digital',
    contact: 'Priya Mehta',
    email: 'priya@growthlab.co',
    city: 'Mumbai',
    applied: '2 weeks ago',
    website: 'growthlab.co',
    stores: '6–20 stores',
    referralPlan: ['Own client base'],
    status: 'Approved',
  },
  {
    id: 5,
    initials: 'SF', color: 'bg-rose-400',
    company: 'SalesFuel Agency',
    contact: 'Rohan Kumar',
    email: 'team@salesfuel.com',
    city: 'Delhi',
    applied: '3 weeks ago',
    website: 'salesfuel.com',
    stores: '1–5 stores',
    referralPlan: ['LinkedIn outreach'],
    status: 'Rejected',
  },
];

const statusStyle = {
  Pending:  'bg-amber-100 text-amber-700',
  Approved: 'bg-emerald-100 text-emerald-700',
  Rejected: 'bg-red-100 text-red-600',
};

export default function Applications() {
  const [apps, setApps] = useState(initialApps);
  const [toast, setToast] = useState(null);

  const pendingCount = apps.filter(a => a.status === 'Pending').length;

  const showToast = (msg, color) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2500);
  };

  const approve = (id) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved' } : a));
    showToast('Application approved — invite sent.', 'bg-emerald-500');
  };

  const reject = (id) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' } : a));
    showToast('Application rejected.', 'bg-red-500');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <Topbar title="Applications" />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-2.5 rounded-lg text-white text-sm font-medium shadow-lg ${toast.color}`}>
          {toast.msg}
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-6">
        <p className="text-sm text-slate-500 mb-6">{pendingCount} partner applications waiting for review</p>

        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-xl border border-slate-200 p-5">
              {/* Header row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${app.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {app.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800">{app.company}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[app.status]}`}>
                        {app.status}
                        {app.status === 'Approved' && ' — invite sent'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {app.contact} — {app.email} — {app.city}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 flex-shrink-0">Applied {app.applied}</p>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-0.5">Website</p>
                  <p className="text-sm text-slate-700">{app.website}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-0.5">Stores managed</p>
                  <p className="text-sm text-slate-700">{app.stores}</p>
                </div>
              </div>

              {/* Referral plan tags */}
              <div className="mb-4">
                <p className="text-xs font-medium text-slate-500 mb-2">Referral plan</p>
                <div className="flex flex-wrap gap-2">
                  {app.referralPlan.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {app.status === 'Pending' && (
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <button
                      onClick={() => approve(app.id)}
                      className="px-5 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => reject(app.id)}
                      className="px-5 py-2 bg-red-50 text-red-500 text-sm font-medium rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                  <button className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Message</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}