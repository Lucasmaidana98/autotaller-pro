import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../css/app.css';

import Dashboard from '@/pages/Dashboard';
import WorkOrders from '@/pages/WorkOrders';
import Customers from '@/pages/Customers';
import Vehicles from '@/pages/Vehicles';
import Parts from '@/pages/Parts';
import Mechanics from '@/pages/Mechanics';
import Layout from '@/components/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/work-orders" element={<WorkOrders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/parts" element={<Parts />} />
            <Route path="/mechanics" element={<Mechanics />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}