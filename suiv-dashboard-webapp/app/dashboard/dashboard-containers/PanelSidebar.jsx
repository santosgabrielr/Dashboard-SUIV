import React from 'react';
import DashboardSidebar from '../dashboard-components/DashboardSidebar';
import PanelContainer from './PanelContainer';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardSidebar />
      <PanelContainer />
    </div>
  );
};

export default Dashboard;