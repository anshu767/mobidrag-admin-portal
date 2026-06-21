import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Partners from './pages/Partners';
import Deals from './pages/Deals';
import Payouts from './pages/Payouts';
import Resources from "./pages/resources";
import Training from "./pages/training";
import ProgramSettings from "./pages/programsettings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="applications" element={<Applications />} />
          <Route path="partners" element={<Partners />} />
          <Route path="deals" element={<Deals />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="resources" element={<Resources />} />
          <Route path="training" element={<Training />} />
          <Route path="settings" element={<ProgramSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}