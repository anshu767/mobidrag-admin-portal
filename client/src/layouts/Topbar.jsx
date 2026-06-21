import { Bell, Search } from 'lucide-react';

export default function Topbar({ title, action }) {
  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell size={18} />
        </button>
        <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-semibold">
          A
        </div>
        {action && action}
      </div>
    </header>
  );
}