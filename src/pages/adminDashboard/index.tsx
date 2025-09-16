import React from 'react';

import { AdminLayout, DashboardMain } from '@/components';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <DashboardMain />
    </AdminLayout>
  );
};

export default AdminDashboard;

AdminDashboard.minimalLayout = true;
