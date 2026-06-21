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
    <aside className="w-[250px] bg-[#151320] text-white min-h-screen flex flex-col">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold">
          M
        </div>
        <div>
          <div className="font-semibold text-white text-sm">MobiDrag</div>
          <div className="text-xs text-[#a8a2bb]">Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-5 px-3">
        {navItems.map((section) => (
          <div key={section.section} className="mb-6">
            
            <p className="text-xs font-semibold text-[#7f7a96] uppercase tracking-wider px-3 mb-2">
              {section.section}
            </p>

            {section.links.map(({ to, icon: Icon, label, badge }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm mb-1 transition ${
                    isActive
                      ? 'bg-[#3a225e] text-white'
                      : 'text-[#d6d2e6] hover:bg-white/5'
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  {label}
                </span>

                {badge && (
                  <span className="text-xs bg-violet-600 text-white px-2 py-0.5 rounded-full">
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