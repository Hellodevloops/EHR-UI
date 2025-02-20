// src/components/HospitalDashboard.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from './layouts/Sidebar';
import Navbar from './layouts/Navbar';
import MainContent from './layouts/MainContent';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import { Users, Calendar, BedDouble } from 'lucide-react';

const HospitalDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const stats = [
    { title: 'Total Patients', value: '1,234', icon: Users, color: 'indigo' },
    { title: 'Appointments Today', value: '45', icon: Calendar, color: 'blue' },
    { title: 'Available Beds', value: '12', icon: BedDouble, color: 'emerald' },
  ];

  const patientColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'ID', accessor: 'id' },
    { header: 'Status', accessor: 'status' },
    { header: 'Room', accessor: 'room' },
  ];

  const patientData = [
    { name: 'John Doe', id: 'PAT-001', status: 'Stable', room: '101' },
    { name: 'Jane Smith', id: 'PAT-002', status: 'Critical', room: 'ICU-2' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} userName="Dr. Smith" />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <MainContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
          <DataTable
            columns={patientColumns}
            data={patientData}
            title="Recent Patients"
            onAddClick={() => console.log('Add patient clicked')}
          />
        </MainContent>
      </div>
    </div>
  );
};

export default HospitalDashboard;