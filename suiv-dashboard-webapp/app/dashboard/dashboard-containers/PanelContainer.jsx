import React from 'react';
import Panel from '../dashboard-components/Panel.jsx'
import DashboardContent1 from '../dashboard-components/DashboardContent1.jsx';
import DashboardContent3 from '../dashboard-components/DashboardContent3.jsx';
import DashboardContent4 from '../dashboard-components/DashboardContent4.jsx';
import MarcaPieChart from '../dashboard-components/DashboardContent2.jsx';

const PanelContainer = () => {
  return (
    <div className="panel-container">
      <Panel>
        <DashboardContent1/>
      </Panel>
      <Panel>
        <MarcaPieChart/>
      </Panel>
      <Panel>
        <DashboardContent3/>
      </Panel>
      <Panel>
        <DashboardContent4/>
      </Panel>
    </div>
  );
};

export default PanelContainer;