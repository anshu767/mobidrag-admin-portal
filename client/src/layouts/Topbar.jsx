import { Bell, Search } from 'lucide-react';

export default function Topbar({ title, action }) {
  return (
    <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-4">

      {/* 🔥 Title */}
      <h1 className="text-base font-medium text-slate-800">
        {title}
      </h1>

      {/* 🔥 Right Section */}
      <div className="flex items-center gap-2">

        {/* Search Icon */}
        <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition">
          <Search size={16} />
        </button>

        {/* Bell */}
        <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition">
          <Bell size={16} />
        </button>

        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-medium">
          A
        </div>

        {/* Optional Action */}
        {action && <div className="ml-2">{action}</div>}
      </div>

    </header>
  );
}