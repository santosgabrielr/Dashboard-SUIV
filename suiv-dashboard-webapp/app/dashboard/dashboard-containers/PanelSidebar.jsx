import React from 'react';
import DashboardSidebar from '../dashboard-components/DashboardSidebar.jsx';
import PanelContainer from './PanelContainer.jsx';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardSidebar />
      <PanelContainer />
    </div>
  );
};

export default Dashboard;