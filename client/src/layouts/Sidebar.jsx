import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, FileText, Briefcase,
  DollarSign, BookOpen, GraduationCap, Settings
} from 'lucide-react';

const navItems = [
  { section: 'Overview', links: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ]},
  { section: 'Partners', links: [
    { to: '/applications', icon: FileText, label: 'Applications', badge: 3 },
    { to: '/partners', icon: Users, label: 'All Partners', badge: 18 },
  ]},
  { section: 'Pipeline', links: [
    { to: '/deals', icon: Briefcase, label: 'All Deals', badge: 31 },
    { to: '/payouts', icon: DollarSign, label: 'Payouts', badge: 3 },
  ]},
  { section: 'Content', links: [
    { to: '/resources', icon: BookOpen, label: 'Resources' },
    { to: '/training', icon: GraduationCap, label: 'Training' },
  ]},
  { section: 'Configuration', links: [
    { to: '/settings', icon: Settings, label: 'Program Settings' },
  ]},
];

export default function Sidebar() {
  return (
    <aside className="w-[220px] bg-[#151320] text-white min-h-screen flex flex-col">
      
      {/* 🔥 Logo (smaller) */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-white/10">
        <div className="w-8 h-8 rounded-md bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
          M
        </div>
        <div>
          <div className="font-medium text-white text-xs">MobiDrag</div>
          <div className="text-[10px] text-[#a8a2bb]">Admin Panel</div>
        </div>
      </div>

      {/* 🔥 Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navItems.map((section) => (
          <div key={section.section} className="mb-5">
            
            <p className="text-[10px] font-semibold text-[#7f7a96] uppercase tracking-wider px-2 mb-2">
              {section.section}
            </p>

            {section.links.map(({ to, icon: Icon, label, badge }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-2 py-2 rounded-md text-xs mb-1 ${
                    isActive
                      ? 'bg-[#3a225e] text-white'
                      : 'text-[#d6d2e6] hover:bg-white/5'
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <Icon size={15} />
                  {label}
                </span>

                {badge && (
                  <span className="text-[10px] bg-violet-600 text-white px-1.5 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}