import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-50">

      {/* 🔥 Sidebar (fixed) */}
      <Sidebar />

      {/* 🔥 Main Content */}
      <div className="flex-1 flex flex-col ml-[220px]">

        {/* 🔥 Topbar fixed */}
        <div className="sticky top-0 z-10 bg-white border-b">
          <Topbar />
        </div>

        {/* 🔥 Page Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
}