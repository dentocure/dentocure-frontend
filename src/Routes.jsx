import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Appointments from './pages/Appointments';
import Billing from './pages/Billing';
import PatientsPage from './pages/Patients';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/PatientsPage" element={<PatientsPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
