'use client';

import DashboardHeader from '@/app/dashboard/dashboard-components/DashboardHeader';
// import Sidebar from '@/app/dashboard/dashboard-components/DashboardSidebar';
//import PanelContainer from './dashboard-containers/PanelContainer';
import PanelSidebar from './dashboard-containers/PanelSidebar'
// import Footer from '../components/Footer';
import '@/style/globals.css';
//import Sidebar from '@/components/Sidebar';


const DashboardHome = () => {
  return (
    <div>
      <DashboardHeader/>
      <div>
        <PanelSidebar/>
      </div>
    </div>
  );
}

export default DashboardHome;