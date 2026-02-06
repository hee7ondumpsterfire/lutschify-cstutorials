import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Training from './pages/Training';
import MapDetail from './pages/MapDetail';
import Admin from './pages/Admin';
import GuideDetail from './pages/GuideDetail';
import GrenadeForm from './components/GrenadeForm';
import SprayPatterns from './pages/SprayPatterns';
import BecomePro from './pages/BecomePro';

import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="training" element={<Training />} />
            <Route path="training/:mapId" element={<MapDetail />} />
            <Route path="sprays" element={<SprayPatterns />} />
            <Route path="become-pro" element={<BecomePro />} />
            <Route path="guides/:mapId" element={<GuideDetail />} />
            <Route path="admin" element={<Admin />} />
            <Route path="admin/grenade/add/:mapId" element={<GrenadeForm />} />
            <Route path="admin/grenade/edit/:grenadeId" element={<GrenadeForm />} />
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
